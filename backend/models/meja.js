'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi meja -> transaksi (parent -> child)
      // key: id_meja
      // parent: meja, child: transaksi
      // tipe: 1 meja bisa memiliki banyak transaksi (one to many)
      this.hasMany(models.transaksi, {
        foreignKey: "id_meja",
        as: "transaksi"
      })
    }
  }
  meja.init({
    id_meja:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomor_meja: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'meja',
    tableName: 'meja'
  });
  return meja;
};