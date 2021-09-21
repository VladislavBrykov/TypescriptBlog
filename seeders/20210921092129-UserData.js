'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let data = [];
    data.push({
      phoneEmail: 'admin',
      password: '444444',
      token: '325345435345435435345435345435345',
      typeId: 'phone',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return queryInterface.bulkInsert('users', data, {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', data, {});

  }
};
