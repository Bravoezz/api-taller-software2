import { user } from '../../data';
import {
    AuthDatasource,
    CustomError,
    LoginUserDTO,
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

    async login(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        const {email,password} = loginUserDto
        try {
            const findUser = await user.findFirst({where:{email}})
            if(!findUser) throw CustomError.customError(402,'User not found');

            const validPassword = this.comparePassword(password,findUser.password);
            if(!validPassword) throw CustomError.customError(402,'User not valid');

            return new UserEntity(
                findUser.id,
                findUser.name,
                findUser.email,
                findUser.password,
                findUser.role,
                findUser.img || ''
            )            
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.customError(500, 'Internal server error');
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const findDuplicateEmail = await user.findFirst({where: { email: registerUserDto.email }});

            if (findDuplicateEmail) throw CustomError.customError(402, 'Error invalid email');

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
