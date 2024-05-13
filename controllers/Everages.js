const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const { DataSensor, Sequelize } = require('../models');
const { Op } = Sequelize;

exports.Average = async (req, res) => {
    try {
        let { tanggal } = req.query;

        // Validasi tanggal
        if (!moment(tanggal, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ error: true, message: "Invalid date format. Please provide the date in YYYY-MM-DD format." });
        }

        // Konversi tanggal ke zona waktu Jakarta
        tanggal = momentTimeZone.tz(tanggal, 'Asia/Jakarta').format('YYYY-MM-DD');

        const allDatas = await DataSensor.findAll({
            where: {
                [Op.or]: [
                    { sensorType: 'NH3' },
                    { sensorType: 'PH' }
                ]
            }
        });

        // Group the data by date and sensor type
        const groupedData = {};
        allDatas.forEach(data => {
            const date = momentTimeZone(data.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD');
            if (!groupedData[date]) {
                groupedData[date] = { NH3: [], PH: [] };
            }
            groupedData[date][data.sensorType].push(data);
        });

        // Calculate the average NH3 concentration and pH value for each date
        const result = {};
        for (const date in groupedData) {
            const nh3Data = groupedData[date].NH3;
            const phData = groupedData[date].PH;

            // Calculate average NH3 concentration
            const nh3Total = nh3Data.reduce((sum, data) => sum + data.value, 0);
            const nh3Average = nh3Total / nh3Data.length;

            // Calculate average pH value
            const phTotal = phData.reduce((sum, data) => sum + data.value, 0);
            const phAverage = phTotal / phData.length;

            result[date] = {
                NH3: {
                    average: nh3Average.toFixed(2), // Adjust the number of decimal places as needed
                    unit: "PPM"
                },
                PH: {
                    average: phAverage.toFixed(2), // Adjust the number of decimal places as needed
                    unit: "pH"
                }
            };
        }

        console.log('Requested Date:', tanggal);
        console.log('Result:', result);

        // Check if data for the requested date is available
        if (!result[tanggal]) {
            return res.json({ success: true, message: "No data available for the requested date." });
        }

        const requestedDateData = result[tanggal];
        res.json({ success: true, data: requestedDateData });

    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};
