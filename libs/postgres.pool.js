
//  pg va a gestionar las conexiones de forma diferente; la primera vez que se genere la conexion pg hace un await interno y luego comparte esa conexion con los demas que lo necesiten, por ende NO NECESITAMOS NINGUN ASYNC;

/*

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'nicotacca',
  password: 'nico1993',
  database: 'my_store'
});

// tampoco necesitamos conecct porque la primera vez que algun servicio requiera la conexion pg ya lo hace

*/

// metodo trayendome las variables desde archivo.

const { Pool } = require('pg');
const { config } = require('./../config/config')

// Lo que se usa mucho es no mandar variable por variable sino PROTEGERLAS ANTES y mandar todo en una URL de conexion. usamos encodeuri para proteger.

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

// para crear la url de conexion, si tenes una bd remota lo mas comun es que te den una, por ej heroku docean amzn. el protocolo para conectarse a postgres es postgres://

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// le damos a pool un string de conexion q el ya reconoce; de esta manera tambien ya nos queda un metodo que nos permite no solamente conectarnos a entornos locales sino tmb a remotos.

const pool = new Pool ({ connectionString: URI })




module.exports = pool;


