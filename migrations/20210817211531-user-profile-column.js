'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'profile_img',
      {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    )
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users','profile_img')
  }
};
