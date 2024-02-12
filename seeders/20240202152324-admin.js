'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Roles } = require('../src/user/enums/roles.enum');
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
        uuid: uuidv4(),
        role: Roles.admin,
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        createdAt: DataTypes.fn('now'),
        updatedAt: DataTypes.fn('now'),
        }
      ],
      {}
  );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
