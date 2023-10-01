import { Request, Response } from 'express';
import { AuthRepository, LoginUserDTO, RegisterUser, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config';
import { user } from '../../data';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const registering = new RegisterUser(this.authRepository,JwtAdapter.generateToken)
        registering.execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error =>  res.json(error))
    }

    loginUser = (req: Request, res: Response) => {
        const [error,loginUserDto] = LoginUserDTO.create(req.body)
        if(error) return res.status(400).json({ error });

         new LoginUser(this.authRepository,JwtAdapter.generateToken)
            .execute(loginUserDto!)
                .then(data => res.json(data))
                .catch(error => res.json(error))
    }

    getUsers = (req: Request, res: Response) => {
        user.findMany()
            .then(resp => res.json({
                users: resp,
                token: req.body.payload
            }))
            .catch(error => {
                console.log(error)
                return res.status(402).json(error)
            })
    }
}
