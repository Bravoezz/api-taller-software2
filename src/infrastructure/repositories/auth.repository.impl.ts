import {
    AuthDatasource,
    AuthRepository,
    RegisterUserDto,
    UserEntity,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) {}

    login(): string {
        throw new Error('Method not implemented.');
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
}
