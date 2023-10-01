import { LoginUserDTO } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDTO): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}