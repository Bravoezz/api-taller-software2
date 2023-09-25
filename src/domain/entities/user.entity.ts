
export class UserEntity {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public img?: string
    ) {}
}
