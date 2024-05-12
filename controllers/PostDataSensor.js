// const { DataSensor } = require('../models');

// exports.postDataSensor = async (req, res) => {
//     try {
//         // Dapatkan data dari body permintaan
//         const { namaData, hasilSensor } = req.body;

//         // Buat entitas baru menggunakan model
//         const newDataSensor = await DataSensor.create({
//             namaData,
//             hasilSensor
//         });

//         // Kirim respons ke klien dengan status 201 Created
//         res.status(201).json({
//             success: true,
//             data: newDataSensor
//         });
//     } catch (error) {
//         // Tangani kesalahan jika terjadi
//         console.error("Error creating data:", error);
//         res.status(500).json({
//             error: true,
//             message: "Internal Server Error",
//             details: error.message
//         });
//     }
// };



const { DataSensor } = require('../models');

exports.postDataSensor = async (req, res) => {
    try {
        // Dapatkan data dari body permintaan
        const { sensorType, value, unit } = req.body;

        // Buat entitas baru menggunakan model
        const newDataSensor = await DataSensor.create({
            sensorType,
            value,
            unit
        });

        // Kirim respons ke klien dengan status 201 Created
        res.status(201).json({
            success: true,
            data: newDataSensor
        });
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error("Error creating data:", error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message
        });
    }
};
