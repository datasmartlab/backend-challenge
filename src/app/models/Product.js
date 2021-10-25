import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        //Garante que é o id_user
        id_product: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.DOUBLE
      },
      {
        //Garante que nome da tabela é users
        sequelize,
        freezeTableName: 'products',
        tableName: 'products'
      }
    )
    return this
  }
  //Associação das tabelas users e products
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' })
  }
}

export default Product
