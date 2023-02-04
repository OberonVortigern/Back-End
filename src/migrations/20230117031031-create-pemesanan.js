'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanan', {
      id_pemesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      nomor_pemesanan: {
        type: Sequelize.INTEGER(10)
      },
      nama_pemesan: {
        type: Sequelize.STRING(100)
      },
      email_pemesan: {
        type: Sequelize.STRING(100)
      },
      tgl_pemesanan: {
        type: Sequelize.DATE
      },
      tgl_check_in: {
        type: Sequelize.DATEONLY
      },
      tgl_check_out: {
        type: Sequelize.DATEONLY
      },
      nama_tamu: {
        type: Sequelize.STRING(100)
      },
      jumlah_kamar: {
        type: Sequelize.INTEGER(11)
      },
      id_tipe_kamar: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tipe_kamar',
          key: 'id_tipe_kamar'
        }
      },
      status_pemesanan: {
        type: Sequelize.ENUM('baru', 'check_in', 'check_out')
      },
      id_user: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'user',
          key: 'id_user'
        }
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
    await queryInterface.dropTable('pemesanan');
  }
};