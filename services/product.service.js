const faker = require('faker');
const boom = require('@hapi/boom');

// me traigo pool a mi servicio para utilizarlo
const pool = require('../libs/postgres.pool');

const sequelize = require('../libs/sequelize')

class ProductsService {


  // con sequelize el tipo gestiona por detras. entonces no necesitamos el pool en el constru

  constructor(){
    this.products = [];
    this.generate();
  }

  // constructor sin sequelize

/*   constructor(){
    this.products = [];
    this.generate();

    // cada vez que instancie un servicio voy a traer el pool de la conexion
    this.pool = pool;
    // tambien por las dudas si hay error metemos un callback
    this.pool.on('error', (err) => console.error(err));
  } */

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  // en vez de retornar el fake retornamos la consulta; RECORDAR que esto es de forma asincrona porque debemos esperar la respuesta del pool


  // sin sequelize

/*   async find() {

    //  primero guardamos el query en una variable
    const query = 'SELECT * FROM tasks';

    // luego hacemos la query al pool
    const rta = await this.pool.query(query);
    return rta.rows;
  } */

  async find() {

    const query = 'SELECT * FROM tasks';

    // lo llamamos aca a seq, nos permite hacer consultas directas! podemos meter codigo sql aca si queremos.

    const [data] = await sequelize.query(query);
    return {
      data,
      // metadata
    };
  }

/*
    find viejo sin pool

    find() {
    return this.products;
  }

*/

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
