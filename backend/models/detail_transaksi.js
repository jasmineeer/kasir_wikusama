'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi: detail_transaksi -> menu (child -> parent)
      // key: id_menu
      // parent: menu, child: detail_transaksi (ForeignKey: id_menu)
      // tipe: 1 detail_transaksi mencatat satu data menu (one to one)
      this.belongsTo(models.menu, {
        foreignKey: "id_menu",
        as: "menu"
      })

      // relasi: detail_transaksi -> transaksi (child -> parent)
      // key: id_transaksi
      // parent: transaksi, child: detail_transaksi (ForeignKey: id_transaksi)
      // tipe: 1 detail_transaksi mencatat satu data transaksi (one to one)
      this.belongsTo(models.transaksi, {
        foreignKey: "id_transaksi",
        as: "transaksi"
      })
    }
  }
  detail_transaksi.init({
    id_detail_transaksi:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_transaksi: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: 'detail_transaksi'
  });
  return detail_transaksi;
};