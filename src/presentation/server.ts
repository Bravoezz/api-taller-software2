import express, { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';


interface ServerOptionsConstructor {
    port?: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: ServerOptionsConstructor) {
        const { port = 4000, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    start() {
        //** middlewares
        // loguar peticiones
        this.app.use(morgan('dev'));

        // configurar los cors
        this.app.use(cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //user las rutas definidas
        this.app.use(this.routes);

        //** lanzar la api
        this.app.listen(this.port, () => {
            console.log('---------------------------------------');
            console.log('\n');
            console.log('        server ready in  ' + this.port + '     ');
            console.log('\n');
            console.log('---------------------------------------');
        });
    }
}
