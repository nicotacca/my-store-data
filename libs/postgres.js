const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'nicotacca',
    password: 'nico1993',
    database: 'my_store'
  });

  // client conect devuelve una promesa como retorno entonces deberia haber un await pero no podemos poner await fuera de una funcion asincrona por eso creamos getconection asincrona.
  await client.connect();
  return client;
}

module.exports = getConnection;
