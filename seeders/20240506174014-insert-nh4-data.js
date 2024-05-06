'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        id: nanoid(),
        namaData: "NH3", // Nama data NH3
        hasilSensor: 7.0, // Hasil sensor NH3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        namaData: "PH", // Nama data PH
        hasilSensor: 6.5, // Hasil sensor PH
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        namaData: "NH3", // Nama data NH3
        hasilSensor: 9.0, // Hasil sensor NH3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        namaData: "PH", // Nama data PH
        hasilSensor: 5.5, // Hasil sensor PH
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        namaData: "NH3", // Nama data NH3
        hasilSensor: 2.0, // Hasil sensor NH3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        namaData: "PH", // Nama data PH
        hasilSensor: 4.5, // Hasil sensor PH
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
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
