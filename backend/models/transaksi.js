'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi: transaksi -> meja (child -> parent)
      // key: id_meja
      // parent: meja, child: transaksi 
      // tipe: 1 transaksi dilakukan oleh 1 meja (one to one)
      this.belongsTo(models.meja, {
        foreignKey: "id_meja",
        as: "meja"
      })

      // relasi: transaksi -> user (child -> parent)
      // key: id_user
      // parent: user, child: transaksi
      // tipe: 1 transaksi dicatat oleh 1 user (one to one)
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user"
      })

      // relasi: transaksi -> detail_transaksi (parent -> child)
      // key: id_transaksi
      // parent: transaksi, child: detail_transaksi
      // tipe: 1 transaksi mempunyai banyak detail_transaksi (one to many)
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
      })
    }
  }
  transaksi.init({
    id_transaksi:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_transaksi: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    id_meja: DataTypes.INTEGER,
    nama_pelanggan: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['belum_bayar','lunas']
    },
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};