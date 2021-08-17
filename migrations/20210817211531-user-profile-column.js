'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'profile_img',
      {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    )
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users','profile_img')
  }
};
