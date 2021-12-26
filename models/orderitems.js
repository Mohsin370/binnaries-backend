'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItems.belongsTo(models.Orders, { foreignKey: { name: 'order_id' } });
      OrderItems.belongsTo(models.Customers, { foreignKey: { name: 'customer_id' } });
      OrderItems.hasMany(models.Products, { foreignKey: { name: 'id' } });

      // define association here
    }
  };
  OrderItems.init({
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'orderItems',
  });
  return OrderItems;
};