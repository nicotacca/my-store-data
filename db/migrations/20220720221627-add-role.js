






'use strict';

const { UserSchema, USER_TABLE, User} = require('./../models/user.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role')
  }
};
