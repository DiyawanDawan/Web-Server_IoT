const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Import operator Sequelize

const { DataSensor, User } = require('../../models');

// Menghapus data sensor berdasarkan ID
exports.deleteDataById = async (req, res) => {
    try {
        const sensorId = req.params.id;
        const deleted = await DataSensor.destroy({
            where: { id: sensorId }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Data sensor tidak ditemukan' });
        }

        res.status(200).json({success: true, message: 'Data sensor berhasil dihapus' });
    } catch (error) {
        // console.error(error);
        res.status(500).json({success: false, message: 'Gagal menghapus data sensor', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({succes: true,  data: users});
    } catch (error) {
        // console.error('Error fetching users:', error);
        res.status(500).json({success: false, message: 'Gagal mengambil data pengguna', error: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await User.destroy({
            where: { id: userId }
        });

        if (deleted === 0) {
            return res.status(404).json({ success: true, message: 'Pengguna tidak ditemukan' });
        }

        res.status(200).json({success: true, message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: 'Gagal menghapus pengguna', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, password, role, username } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Logging incoming data
        console.log('Update Request Data:', { fullName, email, username, role, password });

        if (email) {
            const emailExists = await User.findOne({
                where: {
                    email,
                    id: { [Op.ne]: id }
                }
            });
            if (emailExists) {
                return res.status(400).json({ success: false, message: 'Email is already in use' });
            }
        }

        if (username) {
            const usernameExists = await User.findOne({
                where: {
                    username,
                    id: { [Op.ne]: id }
                }
            });
            if (usernameExists) {
                return res.status(400).json({ success: false, message: 'Username is already in use' });
            }
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        user.role = role || user.role;

        await user.save();

        res.json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
    }
};


exports.getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Temukan pengguna berdasarkan ID
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  };
