const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/middleware"); // Pastikan jalur middleware benar
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
const { getProfile } = require("../controllers/userProfile");
const { deleteDataById, getAllUsers, deleteUserById, updateUser, getUserById } = require("../controllers/admin/deleteDataById");

// Route pendaftaran dan login
router.post('/register', register);
router.post('/login', login);

// Route yang hanya dapat diakses oleh admin
router.get('/admin-dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Selamat datang di dashboard admin', user: req.user });
});

// Route untuk menghapus data sensor berdasarkan ID
router.delete("/delete/:id", authenticateToken, authorizeRole(['admin']), deleteDataById);
// Route untuk mengupdate data pengguna berdasarkan ID (hanya admin)
router.put('/update-user/:id', authenticateToken, authorizeRole(['admin']), updateUser);
router.get('/getuser-user/:id', authenticateToken, authorizeRole(['admin']), getUserById);

// Route yang dapat diakses oleh semua pengguna
router.get('/profile', authenticateToken, authorizeRole(['admin', 'user']), getProfile);
router.post("/postData", authenticateToken, authorizeRole(['admin']), postDataSensor);
router.get("/allUsers", authenticateToken, authorizeRole(['admin']), getAllUsers);
router.delete("/deleteUser/:id", authenticateToken, authorizeRole(['admin']), deleteUserById);

// Route yang memerlukan otentikasi
router.get("/allDataSensors", authenticateToken, authorizeRole(['admin', 'user']), getAllData);
router.get("/allsPh", authenticateToken, authorizeRole(['admin', 'user']), AllsPh);
router.get("/allsNH3", authenticateToken, authorizeRole(['admin', 'user']), AllsNh3);
router.get("/everage", authenticateToken, authorizeRole(['admin', 'user']), Average);
router.get("/withday", authenticateToken, authorizeRole(['admin', 'user']), DataWithDay);
router.get("/rataratappmnhDays", authenticateToken, authorizeRole(['admin', 'user']), DataPPMNHWithDay);
router.get("/count", authenticateToken, authorizeRole(['admin', 'user']), countAllSensors);

module.exports = router;
