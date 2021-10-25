import * as Yup from 'yup'
import Product from '../models/Product'
import User from '../models/User'

class ProductController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      description: Yup.string().max(100),
      price: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' })
    }

    //Pego o id da req.idUser
    req.body.id_user = req.idUser

    const { id_product, name, description, price } = await Product.create(
      req.body
    )

    return res.json({
      id_product,
      name,
      description,
      price
    })
  }

  async index(req, res) {
    const products = await Product.findAll({
      order: ['id_product'],
      attributes: ['id_product', 'name', 'description', 'price', 'id_user']
    })

    if (!products) {
      return res.status(400).json({ error: 'Products not exists!' })
    }

    return res.json(products)
  }

  async details(req, res) {
    const product = await Product.findOne({
      where: { id_product: req.params.id_product },
      attributes: ['id_product', 'name', 'description', 'price'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id_user', 'name', 'email']
        }
      ]
    })

    if (!product) {
      return res.status(400).json({ error: 'Product not exists!' })
    }

    return res.json(product)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' })
    }

    const product = await Product.findByPk(req.params.id_product)

    const { id_product, name, description, price } = await product.update(
      req.body
    )

    return res.json({
      id_product,
      name,
      description,
      price
    })
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id_product)

    if (!product) {
      return res.status(400).json({ error: 'Product not exists' })
    }

    await product.destroy(req.params.id_product)

    return res.json({ message: 'Product excluded with success!' })
  }
}

export default new ProductController()
