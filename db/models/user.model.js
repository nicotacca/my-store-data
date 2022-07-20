

const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },

  // hablando de convenciones, camel case para JS pero en field respetamos el naming para bases de datos
  //seq now para el momento de insercion
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

// esto es importante en seq, ya que accedemos a los metodos de queries, find, findall etc.

// procedemos a crear metodos staticos (no necesaria la instancia) q nos va a ayudar a definir las asociaciones (relaciones)

class User extends Model {
  static associate() {
    // associate
  }

  //
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
