import { user } from '../../data';
import {
    AuthDatasource,
    CustomError,
    RegisterUserDto,
    UserEntity,
} from '../../domain';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword:HashFunction,
        private readonly comparePassword:CompareFunction,
    ){}

    login(): string {
        throw new Error('Method not implemented.');
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const findDuplicateEmail = await user.findFirst({where: { email: registerUserDto.email }});

            if (findDuplicateEmail) throw CustomError.customError(402, 'Email Duplicate');

            //** hashear la contraceña del usuario
            registerUserDto.password = this.hashPassword(registerUserDto.password)

            const { email, id, img, name, password, role } = await user.create({data: registerUserDto});

            return new UserEntity(id, name, email, password, role, img!);
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.customError(500, 'Internal server error');
        }
    }
}
