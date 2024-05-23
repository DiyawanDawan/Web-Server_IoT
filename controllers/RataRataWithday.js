const moment = require('moment');
const { Op, fn, col } = require('sequelize');

const { DataSensor } = require('../models');

exports.DataPPMNHWithDay = async (req, res) => {
    try {
        let { tanggal, sensorType } = req.query;

        // Jika tanggal tidak tersedia, gunakan tanggal terbaru
        if (!tanggal) {
            tanggal = moment().format('YYYY-MM-DD');
        }

        // Validasi tanggal
        if (!moment(tanggal, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ error: true, message: "Invalid date format. Please provide the date in YYYY-MM-DD format." });
        }

        // Jika sensorType tidak tersedia, gunakan NH3 sebagai default
        if (!sensorType) {
            sensorType = 'NH3';
        }

        // Validasi sensorType
        if (sensorType !== 'NH3' && sensorType !== 'PH') {
            return res.status(400).json({ error: true, message: "Invalid sensor type. Please provide 'NH3' or 'PH'." });
        }

        // Ambil data berdasarkan sensorType untuk tanggal tertentu
        const sensorData = await DataSensor.findAll({
            where: {
                sensorType,
                createdAt: {
                    [Op.between]: [moment(tanggal).startOf('day').toDate(), moment(tanggal).endOf('day').toDate()]
                }
            },
            attributes: [
                'sensorType',
                [fn('AVG', col('value')), 'averageValue']
            ],
            group: ['sensorType']
        });

        if (sensorData.length === 0) {
            return res.json({ success: true, message: `No ${sensorType} data available for the requested date.` });
        }

        // Mengonversi tanggal createdAt ke format JSON tanpa zona waktu
        const sensorDataWithoutTimeZone = sensorData.map(data => ({
            sensorType: data.sensorType,
            averageValue: parseFloat(data.dataValues.averageValue).toFixed(2)
        }));

        console.log(`Requested Date: ${tanggal}, Sensor Type: ${sensorType}`);
        console.log(`${sensorType} Data:`, sensorDataWithoutTimeZone);

        res.json({ success: true, data: sensorDataWithoutTimeZone });

    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};
