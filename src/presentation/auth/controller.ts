import { Request, Response } from 'express';
import { AuthRepository, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config';

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then(async user => {
                res.status(200).json({
                    user,
                    token: await JwtAdapter.generateToken({email:user.email})
                })
            })
            .catch( error => {
                console.log(error)
                return res.status(500).json(error)
            })
    }

    loginUser = (req: Request, res: Response) => {
        res.json('Login');
    }
}
