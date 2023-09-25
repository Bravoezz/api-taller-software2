import jwt from 'jsonwebtoken';

export class JwtAdapter {
    static async generateToken(payload: Object,duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {jwt.sign(payload,'secreetkey',{ expiresIn: duration },(error, token) => {
                    if (error) return resolve(null);
                    return resolve(token!);
                }
            );
        });
    }
}
