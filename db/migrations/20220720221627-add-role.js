'use strict';

const { UserSchema, USER_TABLE, User} = require('./../models/user.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role)
  },

  async down (queryInterface, Sequelize) {

  }
};
