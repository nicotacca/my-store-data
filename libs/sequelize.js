

const { Sequelize } = require('sequelize');

const { config } = require('./../config/config')

const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// creamos una instancia de seq. IMPORTANTE: por detras seq ya utiliza la estrategia de POOLING

// le pasamos el URI y ademas uan varibale llamada dialect, que dice la bd que estamos usando + logging true que lo que me permite es que la consola cada vez que haga una consulta en el orm nos deje ver el resultado en SQL

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

// esta va justo despues de instanciar la conexion
setupModels(sequelize);


// coge los modelos y crea la estructura automaticamente en base al schema. Como esta nodemon y tenemos el logger encendido prestar atencion a la consola y a pgadmin

// sequelize.sync();

module.exports = sequelize
