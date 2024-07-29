const moment = require('moment-timezone');
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: () => nanoid(6),
        autoIncrement: true,
        primaryKey: true,
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
