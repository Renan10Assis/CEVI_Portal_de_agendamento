import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use((req: Request,res:Response,next) =>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");;
    app.use(cors());
    next();
});
app.use(express.json());
app.use(routes);


app.listen(3333);