import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
app.use((req: Request,res:Response,next) =>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");;
    app.use(cors());
    app.use('/src/uploads', express.static(path.resolve(__dirname,'uploads')));

    next();
});
app.use(express.json());
app.use(routes);


app.listen(3333);