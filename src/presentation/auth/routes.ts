import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { BcryptAdapter } from '../../config';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {


    static get routes(): Router {
        const router = Router();
        // controller class whit auth
        const datasource = new AuthDatasourceImpl(BcryptAdapter.hash,BcryptAdapter.compare)
        const authRepository = new AuthRepositoryImpl(datasource)

        const controller = new AuthController(authRepository);


        // define auth routes
        router.post('/register', controller.registerUser);
        router.post('/login', controller.loginUser);
        router.get('/users', [AuthMiddleware.validateJWT] ,controller.getUsers);

        return router;
    }
}
