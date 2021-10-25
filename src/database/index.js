import Sequelize from 'sequelize'
import User from '../app/models/User'
import Product from '../app/models/Product'
import dbConfig from '../config/database'

const models = [User, Product]

class Database {
  constructor() {
    this.init()
  }

  init() {
    //Armazeno a instância do sequelize com os dasdos da configuração
    this.connection = new Sequelize(dbConfig)
    models
      //Inicializa os models da aplicação
      .map(model => model.init(this.connection))
      //Verifica em qual models tem associação e inicializa
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
