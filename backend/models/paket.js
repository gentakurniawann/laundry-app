'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_paket",
        as: "paket"
      })
    }
  }
  paket.init({
    id_paket: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jenis: DataTypes.STRING,
    satuan: DataTypes.ENUM("kg","pcs"),
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'paket',
    tableName: 'paket'
  });
  return paket;
};