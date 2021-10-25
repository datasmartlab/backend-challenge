import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        //Garante que é o id_user
        id_user: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        password_hash: Sequelize.VIRTUAL
      },
      {
        //Garante que nome da tabela é users
        sequelize,
        freezeTableName: 'users',
        tableName: 'users'
      }
    )
    //Executa essa função antes de salvar no banco
    this.addHook('beforeSave', async user => {
      if (user.password_hash) {
        user.password = await bcrypt.hash(user.password_hash, 8)
      }
    })
    return this
  }
  //Compara as senhas
  checkPassword(password_hash) {
    return bcrypt.compare(password_hash, this.password)
  }
}

export default User
