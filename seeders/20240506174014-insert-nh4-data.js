'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     // Menambahkan data ke dalam tabel DataSensor
     await queryInterface.bulkInsert("DataSensor", [
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 13.15, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 20.2, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 20.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 40.17, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 95.5, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 20.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 70.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 70.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 75.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 100.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 20.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // Menghapus semua data seed dari tabel DataSensor
    await queryInterface.bulkDelete("DataSensor", null, {});
  }
};
