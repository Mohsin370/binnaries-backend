'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.hasMany(models.OrderItems,{foreignKey:'id'});
      Orders.belongsTo(models.Customers,{foreignKey:'customer_id'});
      // Orders.hasOne(model.Invoices,{foreignKey:'order_no'})
      // define association here
    }
  };
  Orders.init({
    status:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Orders',
    tableName: 'orders',
  });
  return Orders;
};