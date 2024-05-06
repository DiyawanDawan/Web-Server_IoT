
const { DataSensor } = require('../models');
exports.getDashboardUser = async (req, res) => {
    try {
      const allDatas = await DataSensor.findAll();
      // Mengirim respons JSON ke klien
      res.json({succes: true,data: allDatas,});
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({error: true, massage: "Internal Server Error", details: error.message });;
    }
};
