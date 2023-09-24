import express, { Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

// loguar peticiones
app.use(morgan('dev'));

// configurar los cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Configurar las rutas */

app.get('/', (_, res: Response) => {
    console.log('hola rama dev')
    res.status(200).send('hola desde valtx ');
});

app.listen(port, () => {
    console.log('server ready in ' + port);
});

export default app;
