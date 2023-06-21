import Express,{Request,Response, json} from 'express';
import routes from './routes';
import dotEnv from 'dotenv'
const server = Express();

dotEnv.config();
server.use(Express.json());
server.use(routes)

server.use((req: Request, res: Response) => {
    res.status(404).json("Rota não encontrada");
});

server.listen(process.env.PORT)
console.log("A porta é: "+process.env.PORT)