'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.pemesanan, {
        foreignKey: 'id_pemesanan',
        as: 'pemesanan'
      })

      this.belongsTo(models.kamar, {
        foreignKey: 'id_kamar',
        as: 'kamar'
      })
    }
  }
  detail_pemesanan.init({
    id_detail_pemesanan: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    id_pemesanan: DataTypes.INTEGER(11),
    id_kamar: DataTypes.INTEGER(11),
    tgl_akses: DataTypes.DATEONLY,
    harga: DataTypes.INTEGER(11)
  }, {
    sequelize,
    modelName: 'detail_pemesanan',
    tableName: 'detail_pemesanan'
  });
  return detail_pemesanan;
};