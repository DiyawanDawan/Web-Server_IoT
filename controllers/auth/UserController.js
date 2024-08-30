const {User, Sequelize} = require('../../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); 

exports.register = async (req, res) => {
    const {fullName, gender, username, email, password,  role } = req.body;

    // Cek apakah semua field yang diperlukan ada
    if (!username || !password || !email || !fullName || !gender) {
        return res.status(400).json({error: true, message: 'Semua bidang wajib diisi' });
    }

    // Validasi panjang dan kompleksitas kata sandi
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({error: true, message: 'Kata sandi harus terdiri dari minimal 8 karakter dan terdiri dari kombinasi huruf, angka, dan simbol.' });
    }

    try {
        // Cek apakah username atau email sudah ada
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
        if (existingUser) {
            return res.status(409).json({ error: true, message: 'Nama pengguna atau email sudah digunakan' });
        }

        // Hash kata sandi
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Set role default ke 'user' jika tidak ada
        const userRole = role || 'user';

        // Buat pengguna baru
        const user = await User.create({
            fullName,
            gender,
            username,
            email,
            password: hashedPassword,
            role: userRole
        });

        res.status(201).json({
            message: 'Pengguna berhasil terdaftar',
            user: {
                id: user.id,
                fullName: user.fullName,
                gender: user.gender, 
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error saat registrasi:', error);
        res.status(500).json({error: true, message: 'Registrasi pengguna gagal', error: error.message });
    }
};



exports.login = async (req, res) => {
    const { email, username, password } = req.body;

    try {
          // Periksa apakah email atau username disediakan
          if (!email && !username) {
            return res.status(400).json({ message: 'Email atau username harus disediakan' });
        }

        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    email ? { email } : null,
                    username ? { username } : null
                ].filter(Boolean) // Menghapus nilai null atau undefined dari array
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Email salah ' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Kata sandi salah' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, name: user.name,  role: user.role}, process.env.JWT_SECRET); // tambahkan 'name' di payload token
        res.json({ token, user: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,
            role: user.role
        } });
    } catch (error) {
        res.status(500).json({ message: 'Login gagal', error: error.message });
    }
};