import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async session(req, res) {
    //Verifica se os campos estão corretos
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password_hash: Yup.string().required()
    })
    //Caso os campos esteja incorreto
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails!' })
    }

    const { email, password_hash } = req.body

    const user = await User.findOne({
      where: {
        email
      },
      attributes: ['id_user', 'name', 'email', 'password']
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found!' })
    }

    if (!(await user.checkPassword(password_hash))) {
      return res.status(401).json({ error: 'Password does not match!' })
    }

    const { id_user, name } = user

    return res.json({
      user: {
        id_user,
        name,
        email
      },
      //Cria a autenticação
      token: jwt.sign({ id_user }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
