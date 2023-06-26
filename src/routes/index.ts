import { Router } from 'express'
import * as userController from '../controllers/userController'
import * as productController from '../controllers/productController'

const routes = Router();

routes.post('/createUser', userController.createUser);
routes.post('/signInUser', userController.signInUser);

routes.post('/product', productController.addProduct);
routes.put('/product', productController.alterProduct);
routes.get('/product', productController.getAllProducts);
routes.delete('/product', productController.deleteProduct);

export default routes;