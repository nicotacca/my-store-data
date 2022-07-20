

require('dotenv').config();

const config = {

  // en que entorno nos encontramos? en node leemos variables de ent con process. Siempre para node hay una var q se llama nodeenv, en caso de que no este le decimos que es dev.
  env:process.env.NODE_ENV||'dev',
  // o el puerto (que nos da heroku por ej) o 3000
  port:process.env.PORT||3000,
  // estas var nos la da el host o donde deployamos
  dbUser:process.env.DB_USER,
  dbPassword:process.env.DB_PASSWORD,
  dbHost:process.env.DB_HOST,
  dbName:process.env.DB_NAME,
  dbPort:process.env.DB_PORT,

}

module.exports = { config };

// Aca vamos a tener la cfg base para leer las variables de entorno.
