const express = require("express");
const router = express.Router();

const {
	getDashboardUser
} = require("../controllers/PostDataSensor");

router.get("/allDataSensors", getDashboardUser);
module.exports = router;
