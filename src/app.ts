import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

async function main() {
    // iniciar el server
    new Server({
        routes: AppRoutes.routes,
        port: Number(envs.PORT),
    }).start();
}

main();
