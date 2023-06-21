import {Router} from 'express'
import * as UserController from '../controllers/userController'
import * as productController from '../controllers/productController'
import * as testeController from '../controllers/testeController'
const routes=Router();

routes.post('/createUser',UserController.createUser);
routes.post('/signInUser',UserController.signInUser);

routes.post('/product',productController.addProduct);
routes.put('/product',productController.alterProduct);
routes.get('/product',productController.getAllProducts);
routes.delete('/product',productController.deleteProduct);

routes.get('/',testeController.teste)

export default routes;