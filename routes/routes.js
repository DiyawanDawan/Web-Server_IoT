const express = require("express");
const router = express.Router();

const {
	getDashboardUser
} = require("../controllers/GetAllDataSensor");
const {
	postDataSensor
} = require("../controllers/PostDataSensor");

router.get("/allDataSensors", getDashboardUser);
router.post("/postData", postDataSensor);
module.exports = router;
