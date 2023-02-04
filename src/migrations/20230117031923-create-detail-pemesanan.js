'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pemesanan', {
      id_detail_pemesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      id_pemesanan: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'pemesanan',
          key: 'id_pemesanan'
        }
      },
      id_kamar: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'kamar',
          key: 'id_kamar'
        }
      },
      tgl_akses: {
        type: Sequelize.DATEONLY
      },
      harga: {
        type: Sequelize.INTEGER(11)
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
    await queryInterface.dropTable('detail_pemesanan');
  }
};