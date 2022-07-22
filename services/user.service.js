const boom = require('@hapi/boom');


// no necesito la conexion ahora, ya que seq la realiza.
// const getConnection = require('../libs/postgres')

// me traigo a seq
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {

    const newUser = await models.User.create(data)
    return newUser

    //return data;
  }

/*   async find() {
    // return [];

    //VIDEO 6 implementando consulta
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM tasks')
    return rta.rows;
  } */

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    })
    return rta
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = user.update(changes);
    return rta
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return id;
  }
}

module.exports = UserService;
