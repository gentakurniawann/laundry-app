'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.paket,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
      this.hasMany(models.admin,{
        foreignKey: "id_outlet",
        as: "outlets"
      })
      this.hasMany(models.transaksi,{
        foreignKey: "id_outlet",
        as: "transaksi"
      })
    }
  }
  outlet.init({
    id_outlet: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};