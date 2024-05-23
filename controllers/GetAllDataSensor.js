const moment = require('moment');
const { DataSensor } = require('../models');

exports.getAllData = async (req, res) => {
    try {
        const allDatas = await DataSensor.findAll({
            order: [['createdAt', 'DESC']] // Mengurutkan berdasarkan createdAt dari yang terbaru ke yang terlama
        });
        // Mengonversi createdAt dan updatedAt menjadi string dengan format lokal
        const formattedData = allDatas.map(data => ({
            id: data.id,
            sensorType: data.sensorType,
            value: data.value,
            unit: data.unit,
            createdAt: moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss'), // Adjust format as needed
        }));

        // Mengirim respons JSON ke klien
        res.json({ success: true, data: formattedData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};
