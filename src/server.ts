import express,{Request,Response} from 'express';
import routes from './routes';
import dotEnv from 'dotenv'
const server = express();

dotEnv.config();
server.use(express.json());
server.use(routes)

server.use((req: Request, res: Response) => {
    res.status(404).json('Rota não encontrada');
});

server.listen(process.env.PORT)
console.log('A porta é: '+ process.env.PORT)