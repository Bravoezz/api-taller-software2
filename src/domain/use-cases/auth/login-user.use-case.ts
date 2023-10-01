import { LoginUserDTO } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDTO): Promise<UserToken>;
}

interface UserTokenAtomic {
    id: number;
    name: string;
    email: string;
}

interface UserToken {
    token: string;
    user: UserTokenAtomic;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SignToken
    ){}

    async execute(loginUserDto: LoginUserDTO): Promise<UserToken> {
        const {email,id,name} = await this.authRepository.login(loginUserDto)

        const token = await this.singToken({email,id},'2h');
        if(!token) throw CustomError.customError(402,'Error generating token');

        return {
            token,
            user:{ email,id,name }
        }
    }
    
}