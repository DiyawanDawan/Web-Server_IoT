// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     await queryInterface.createTable("DataSensor", {
//       id: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         primaryKey: true,
//       },
//       namaData: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       hasilSensor: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false,
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false,
//       },
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     await queryInterface.dropTable("DataSensor");
//   },
// };


"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("DataSensor", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
    
      sensorType: { // Menambahkan kolom sensor_type
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: { // Mengubah kolom hasilSensor menjadi value
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unit: { // Menambahkan kolom unit
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: { // Mengubah kolom createdAt menjadi timestamp
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("DataSensor");
  },
};
