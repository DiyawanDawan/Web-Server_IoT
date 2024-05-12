// // nh4.js (Model NH4)
// const { nanoid } = require("nanoid");

// module.exports = (sequelize, DataTypes) => {
//   const DataSensor = sequelize.define(
//     "DataSensor", // Ubah nama model menjadi DataSensor
//     {
//       id: {
//         type: DataTypes.STRING,
//         defaultValue: () => nanoid(6),
//         primaryKey: true,
//         allowNull: false,
//       },
//       namaData: { // Ubah nama kolom menjadi camelCase
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       hasilSensor: { // Ubah nama kolom menjadi lebih deskriptif
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: false,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "datasensor", // Tetapkan nama tabel Anda
//       timestamps: true,
//     }
//   );
//   return DataSensor;
// };


// nh4.js (Model NH4)
const { nanoid } = require("nanoid");
const moment = require('moment-timezone');
module.exports = (sequelize, DataTypes) => {
  const DataSensor = sequelize.define(
    "DataSensor", // Ubah nama model menjadi DataSensor
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: () => nanoid(6),
        primaryKey: true,
        allowNull: false,
      },
     
      sensorType: { // Tambahkan kolom sensor_type untuk menyimpan jenis sensor (NH3 atau pH)
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: { // Ganti nama kolom dari hasilSensor menjadi value
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: { // Tambahkan kolom unit untuk menyimpan satuan (misalnya PPM atau pH)
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: { // Ganti nama kolom dari createdAt menjadi timestamp
        type: DataTypes.DATE,
        defaultValue: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
        // defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "datasensor", // Tetapkan nama tabel Anda
      timestamps: false, // Atur timestamps menjadi false karena kita sudah menggunakan kolom timestamp terpisah
    }
  );
  return DataSensor;
};
