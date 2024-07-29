const {User} = require('../../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); 

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Semua bidang wajib diisi' });
    }

    // Validate password length and complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Kata sandi harus terdiri dari minimal 8 karakter dan terdiri dari kombinasi huruf, angka, dan simbol.' });
    }

    try {
        // Check if the email or username already exists
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
        if (existingUser) {
            return res.status(409).json({ message: 'Nama pengguna atau email yang sudah digunakan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email });

        res.status(201).json({ message: 'Pengguna berhasil terdaftar', user: {
            id: user.id,
            username: user.username,
            email: user.email
        }});
    } catch (error) {
        res.status(500).json({ message: 'Registrasi pengguna gagal', error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email tidak valid' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Kata sandi salah' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: {
            id: user.id,
            username: user.username,
            email: user.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'Login gagal', error: error.message });
    }
};