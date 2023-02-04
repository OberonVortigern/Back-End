'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  pemesanan.init({
    id_pemesanan: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    nomor_pemesanan: DataTypes.INTEGER(10),
    nama_pemesan: DataTypes.STRING(100),
    email_pemesan: DataTypes.STRING(100),
    tgl_pemesanan: DataTypes.DATE,
    tgl_check_in: DataTypes.DATEONLY,
    tgl_check_out: DataTypes.DATEONLY,
    nama_tamu: DataTypes.STRING(100),
    jumlah_kamar: DataTypes.INTEGER(11),
    id_tipe_kamar: DataTypes.INTEGER(11),
    status_pemesanan: DataTypes.ENUM('baru', 'check_in', 'check_out'),
    id_user: DataTypes.INTEGER(11)
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanan'
  });
  return pemesanan;
};