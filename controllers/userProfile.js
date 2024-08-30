const { User } = require('../models'); // Pastikan model User diimport dari path yang benar

// Mendapatkan profil pengguna berdasarkan ID yang terdapat dalam token
exports.getProfile = async (req, res) => {
    try {
      //  console.log('req.user:', req.user); // Tambahkan log ini
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({success: false, message: 'Pengguna tidak ditemukan' });
        }

        res.json({
            success: true,
            data: {
                id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            gender: user.gender,
            role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mendapatkan profil pengguna', error: error.message });
    }
};

/*
// Mengupdate profil pengguna
exports.updateProfile = async (req, res) => {
    const { fullName, email, gender, role } = req.body;

    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Update field yang diizinkan
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.role = role || user.role;

        await user.save();

        res.json({
            message: 'Profil berhasil diperbarui',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                gender: user.gender,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui profil pengguna', error: error.message });
    }
};
*/
