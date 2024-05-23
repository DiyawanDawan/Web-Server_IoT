const { DataSensor, Sequelize } = require('../../models');

// Controller untuk menghitung semua data NH3 dan PH, dan menampilkan unit dan sensorType
exports.countAllSensors = async (req, res) => {
    try {
        // Menghitung jumlah data NH3 dan mengelompokkan berdasarkan sensorType
        const nh3Data = await DataSensor.findAll({
            where: {
                sensorType: 'NH3'
            },
            attributes: [
                'sensorType',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'countNH3'],
            ],
            group: ['sensorType']
        });

        // Menghitung jumlah data PH dan mengelompokkan berdasarkan sensorType
        const phData = await DataSensor.findAll({
            where: {
                sensorType: 'PH'
            },
            attributes: [
                'sensorType',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'countPH'],
            ],
            group: ['sensorType']
        });

        // Format data NH3
        const nh3Counts = nh3Data.map(item => ({
            sensorType: item.sensorType,
            countNH3: parseInt(item.dataValues.countNH3)
        }));

        // Format data PH
        const phCounts = phData.map(item => ({
            sensorType: item.sensorType,
            countPH: parseInt(item.dataValues.countPH)
        }));

        // Gabungkan hasil NH3 dan PH menjadi satu array
        const counts = [
            ...phCounts,
            ...nh3Counts
        ];

        // Mengirimkan respon sebagai array
        res.json({
            success: true,
            counts
        });
    } catch (error) {
        console.error("Error counting sensor data:", error);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};
