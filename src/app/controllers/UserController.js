import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      email: Yup.string().required().max(100),
      password_hash: Yup.string().required().min(6).max(100)
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' })
    }
    //Verifica e armazana o email no banco
    const UserExists = await User.findOne({
      attributes: ['id_user'],
      where: {
        email: req.body.email
      }
    })

    if (UserExists) {
      return res.status(400).json({ error: 'E-mail already exists!' })
    }

    const { id_user, name, email } = await User.create(req.body)

    return res.json({
      id_user,
      name,
      email
    })
  }

  async index(req, res) {
    const users = await User.findAll({
      order: ['name'],
      attributes: ['id_user', 'name', 'email']
    })

    return res.json(users)
  }

  async details(req, res) {
    const user = await User.findOne({
      where: { id_user: req.params.id_user },
      attributes: ['id_user', 'name', 'email']
    })

    if (!user) {
      return res.status(400).json({ error: 'User not exists!' })
    }

    return res.json(user)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().max(100),
      email: Yup.string().max(100),
      oldPassword: Yup.string(),
      password_hash: Yup.string()
        .min(6)
        .max(100)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .max(100)
        .when('password_hash', (password_hash, field) =>
          password_hash
            ? field.required().oneOf([Yup.ref('password_hash')])
            : field
        )
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' })
    }

    const { email, oldPassword } = req.body

    //Busca o usuário logado
    const user = await User.findByPk(req.idUser)

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        where: { email: req.body.email }
      })

      if (emailExists) {
        return res.status(400).json({
          error: 'E-mail already exists!'
        })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({
        error: 'Password does not match'
      })
    }

    const { id_user, name } = await user.update(req.body)

    return res.json({
      id_user,
      name,
      email
    })
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id_user)

    if (!user) {
      return res.status(400).json({ error: 'User not exists' })
    }

    await user.destroy(req.params.id_user)

    return res.json({ message: 'User excluded with success!' })
  }
}

export default new UserController()
