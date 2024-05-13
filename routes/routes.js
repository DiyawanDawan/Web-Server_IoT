const express = require("express");
const router = express.Router();

const {
	getAllData
} = require("../controllers/GetAllDataSensor");
const {
	postDataSensor
} = require("../controllers/PostDataSensor");
const { AllsPh } = require("../controllers/AllsPh");
const { AllsNh3 } = require("../controllers/AllsNh3");
const { Average } = require("../controllers/Everages");
const { DataWithDay } = require("../controllers/AllDataWithDays");

router.get("/allDataSensors", getAllData);
router.get("/allsPh", AllsPh);
router.get("/allsNH3", AllsNh3);
router.get("/everage", Average);
router.get("/withday", DataWithDay);
router.post("/postData", postDataSensor);
module.exports = router;
