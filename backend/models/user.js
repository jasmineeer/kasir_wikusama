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
      // define association here

      // relasi user -> transaksi (parent -> child)
      // key: id_user
      // parent: user, child: transaksi
      // tipe: 1 user bisa memiliki banyak transaksi (one to many)
      this.hasMany(models.user, {
        foreignKey: "id_user",
        as: "transaksi"
      })
    }
  }
  user.init({
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_user: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin','kasir','manajer']
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};