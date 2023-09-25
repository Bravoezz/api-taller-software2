export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }

    static customError(status:number,message:string):CustomError{
        return new CustomError(status,message)
    }
}
