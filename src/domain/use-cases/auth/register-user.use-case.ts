import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
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

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        // crae usuario
        const { email,id,name} = await this.authRepository.register(registerUserDto) 

        // token
        const token = await this.signToken({id,email},'2h');
        if(!token) throw CustomError.customError(500,"Error Token");

        return { 
            token,
            user:{
                email,
                id,
                name
            }
        }
    }
}
