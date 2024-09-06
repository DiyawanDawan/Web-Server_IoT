const moment = require('moment-timezone');
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: () => nanoid(6),
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {  
        type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      }
    },
    {
      tableName: "user",
      timestamps: true,
    }
  );
  return User;
};
