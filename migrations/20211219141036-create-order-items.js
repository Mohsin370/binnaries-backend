'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'products',
          key: 'id'
        }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'customers',
          key: 'id'
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'orders',
          key: 'id'
        }
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orderItems');
  }
};