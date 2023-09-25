import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

    abstract login(): string;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}