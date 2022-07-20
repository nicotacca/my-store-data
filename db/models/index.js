
// me traigo los modelos
const { User, UserSchema } = require('./user.model');


// creo la funcion q hace el setup de los mismos y que recibe como parametro la conexion!
function setupModels(sequelize) {

  // le decimos que esquema y que configuracion debe aplicar
  User.init(UserSchema, User.config(sequelize));
}

// exporto la funcion para usarla en seqelize.js
module.exports = setupModels;
