'use strict';

const { nanoid } = require('nanoid');
const moment = require('moment-timezone');

// Mendapatkan waktu sekarang dengan zona waktu yang diinginkan (Asia/Jakarta)
const currentTime = moment.tz('Asia/Jakarta');

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
        value: 3.4, // Tambahkan value untuk MQ-135
        unit: "ppm", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
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
