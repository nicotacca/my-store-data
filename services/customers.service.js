

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

/*   async create(data) {
    // tenemos que crear un user primero
    const newUser = await models.User.create(data.user)
    // le pasamos la data, el path q no coincida con atributos lo va a ignorar y le suma el user Id
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    return newCustomer;
  } */


  // codigo mas simple y rapido sin crear el user aparte manualmente usando asociaciones

  async create(data) {
    // solamente le envio la data, seq ya sabe q hay un user adentro
    const newCustomer = await models.Customer.create(data, {
      // si encuentra un user adentro, que lo cree con esa data
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
