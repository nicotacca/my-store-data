'use strict';

const { UserSchema, USER_TABLE, User} = require('./../models/user.model')

// me traigo user schema y el nombre de la tabla, usando queryinterface que nos deja ejecutar una tanda de comandos como createtable etc. vamos a hacer el de creacion de tabla de usuarios

//si tenemos varios modelos podemos ir haciendo todo aca

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
  },

  // si quiero revertir el cambio

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE)
  }
};
