// nh4.js (Model NH4)
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  const DataSensor = sequelize.define(
    "DataSensor", // Ubah nama model menjadi DataSensor
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: () => nanoid(),
        primaryKey: true,
        allowNull: false,
      },
      namaData: { // Ubah nama kolom menjadi camelCase
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasilSensor: { // Ubah nama kolom menjadi lebih deskriptif
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "datasensor", // Tetapkan nama tabel Anda
      timestamps: true,
    }
  );
  return DataSensor;
};
