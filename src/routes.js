import { Router } from 'express'
const routes = new Router()

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'
import authMiddleware from './app/middlewares/auth'
import ProductController from './app/controllers/ProductController'

routes.post('/users', UserController.create)
routes.post('/session', SessionController.session)

routes.use(authMiddleware)
routes.get('/users', UserController.index)
routes.get('/users/:id_user', UserController.details)
routes.put('/users', UserController.update)

routes.post('/products', ProductController.create)
routes.get('/products', ProductController.index)
routes.get('/products/:id_product', ProductController.details)
routes.put('/products/:id_product', ProductController.update)
routes.delete('/products/:id_product', ProductController.delete)

export default routes
