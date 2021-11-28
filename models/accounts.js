'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Accounts.init({
    acc_no: {
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    acc_title:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    card_no: {
      type: DataTypes.BIGINT,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'accounts',
    modelName: 'Accounts',
  });
  return Accounts;
};