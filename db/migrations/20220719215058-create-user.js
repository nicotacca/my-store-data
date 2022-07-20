'use strict';

// para este caso vamos a nuestro modelo de users y nos traemos el schema y el nombre de la tabla

const { UserSchema, USER_TABLE } = require("./../models/user.model")

//

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
  },


  // esta es la parte para hacer ROLLBACK y hay que programarla a la inversa

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE)
  }
};

// normalmente la primer migra crea todas (o la mayoria de) las tablas

//
