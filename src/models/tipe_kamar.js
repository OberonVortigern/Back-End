'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.kamar, {
        foreignKey: 'id_tipe_kamar',
        as: 'kamar'
      })
    }
  }
  tipe_kamar.init({
    id_tipe_kamar: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    nama_tipe_kamar: DataTypes.STRING(100),
    harga: DataTypes.INTEGER(11),
    deskripsi: DataTypes.TEXT,
    foto: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tipe_kamar',
    tableName: 'tipe_kamar'
  });
  return tipe_kamar;
};