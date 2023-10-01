import {
    AuthDatasource,
    AuthRepository,
    LoginUserDTO,
    RegisterUserDto,
    UserEntity,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) {}

    login(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
}
