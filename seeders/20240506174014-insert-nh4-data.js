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

      // Menambahkan 10 data untuk NH3
      const nh3Data = Array.from({ length: 10 }).map(() => ({
        id: nanoid(6),
        sensorType: 'NH3',
        value: parseFloat((Math.random() * 10).toFixed(2)), // Nilai acak antara 0 dan 10
        unit: 'ppm',
        createdAt: currentTime.toDate(),
      }));
  
      // Menambahkan 10 data untuk pH
      const phData = Array.from({ length: 10 }).map(() => ({
        id: nanoid(6),
        sensorType: 'pH',
        value: parseFloat((Math.random() * 14).toFixed(2)), // Nilai acak antara 0 dan 14 untuk pH
        unit: 'pH',
        createdAt: currentTime.toDate(),
      }));
  
      // Menyisipkan data ke dalam tabel DataSensor
      await queryInterface.bulkInsert('DataSensor', [...nh3Data, ...phData], {});
  
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
