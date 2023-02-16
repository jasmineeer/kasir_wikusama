'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi menu -> detail_transaksi (parent -> child)
      // key: id_menu
      // parent: menu, child: detail_transaksi
      // tipe: 1 menu tercatat sebanyak beberapa kali di detail_transaksi
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_menu",
        as: "detail_transaksi"
      })
    }
  }
  menu.init({
    id_menu:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_menu: DataTypes.STRING,
    jenis: {
      type: DataTypes.ENUM,
      values: ['makanan','minuman']
    },
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu'
  });
  return menu;
};