// routes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
// const { authenticateToken } = require('../middleware/authenticateToken');
const { register, login } = require('../controllers/auth/UserController');

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
const { countAllSensors } = require("../controllers/Caculasi/CalculasiAllsPHNh3");
const { DataPPMNHWithDay } = require("../controllers/RataRataWithday");

router.post('/register', register);
router.post('/login', login);

router.get("/allDataSensors", authenticateToken, getAllData);
router.get("/allsPh", authenticateToken, AllsPh);
router.get("/allsNH3", authenticateToken, AllsNh3);
router.get("/everage", authenticateToken, Average);
router.get("/withday", authenticateToken, DataWithDay);
router.get("/rataratappmnhDays", authenticateToken, DataPPMNHWithDay);
router.get("/count", authenticateToken, countAllSensors);
router.post("/postData", authenticateToken, postDataSensor);
module.exports = router;


