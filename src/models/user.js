'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pemesanan, {
        foreignKey: 'id_user',
        as: 'pemesanan'
      })
    }
  }
  user.init({
    id_user: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    nama_user: DataTypes.STRING(100),
    foto: DataTypes.TEXT,
    email: DataTypes.STRING(100),
    password: DataTypes.TEXT,
    role: DataTypes.ENUM('admin', 'resepsionis')
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};