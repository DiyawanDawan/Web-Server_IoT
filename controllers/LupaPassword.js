require('dotenv').config(); // Load variabel lingkungan dari file .env
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email tidak ditemukan' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Reset Password',
            text: `Anda menerima email ini karena Anda (atau seseorang) telah meminta pengaturan ulang password untuk akun Anda.\n\n` +
                `Silakan klik tautan berikut, atau tempelkan ke browser Anda untuk menyelesaikan prosesnya:\n\n` +
                `http://localhost:3000/reset-password/${resetToken}\n\n` +
                `Jika Anda tidak meminta ini, abaikan saja email ini, dan password Anda akan tetap aman.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email reset password telah dikirim.' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Terjadi kesalahan.', error: error.message });
    }
};


// Controller untuk mengatur ulang password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() } // Token belum kedaluwarsa
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token tidak valid atau telah kedaluwarsa.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password berhasil direset.' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan.', error });
    }
};
