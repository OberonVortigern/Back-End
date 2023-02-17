'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      nama_user: {
        type: Sequelize.STRING(100)
      },
      foto: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.ENUM('admin', 'resepsionis')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('user');
  }
};