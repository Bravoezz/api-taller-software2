

export class LoginUserDTO {
    constructor(
        public email: string,
        public password: string
    ) {}

    static create(loginParams:{email:string,password:string}):[string?,LoginUserDTO?]{
        const {email,password} = loginParams

        if(!email) return ["Missing email"];
        if(!password) return ["Missing password"];

        return [
            undefined,
            new LoginUserDTO(email,password)
        ]
    }
}