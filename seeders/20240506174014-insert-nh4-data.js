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
        sensorType: "PH", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 1.15, // Tambahkan value untuk MQ-135
        unit: "PH", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 3.15, // Tambahkan value untuk MQ-135
        unit: "PH", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 4.5, // Tambahkan value untuk MQ-135
        unit: "PH", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
      },
      // {
      //   id: nanoid(6),
      //   sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
      //   value: 4.15, // Tambahkan value untuk MQ-135
      //   unit: "PPM", // Tambahkan unit untuk MQ-135
      //   createdAt:  new Date(),
      // },
       /**
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 5.2, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 4.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 8.17, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 7.5, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 4.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt: new Date(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 10.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 1.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 0.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "PH", // Tambahkan sensorType untuk PH (penyesuaian penamaan)
        value: 1.10, // Tambahkan value untuk PH
        unit: "pH", // Tambahkan unit untuk PH
        createdAt:  currentTime.toDate(),
      },
      {
        id: nanoid(6),
        sensorType: "NH3", // Tambahkan sensorType untuk MQ-135 (penyesuaian penamaan)
        value: 2.20, // Tambahkan value untuk MQ-135
        unit: "PPM", // Tambahkan unit untuk MQ-135
        createdAt:  currentTime.toDate(),
      },

     
       * 
       */
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
