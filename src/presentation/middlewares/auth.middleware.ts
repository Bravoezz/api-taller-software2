import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { user } from '../../data';

type PayloadJwtVerify = { 
    id: number;
    email: string;
    exp:string;
 };


export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');

        if (!authorization)
            return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').pop() || '';
        try {
            const payload = await JwtAdapter.validateToken<PayloadJwtVerify>(token);
            if (!payload)
                return res.status(401).json({ error: 'Invalid token' });
            // console.log(payload)
            const findUser = await user.findUnique({where:{id:payload.id}})

            if(!findUser)
                return res.status(401).json({ error: 'Invalid token' });


            req.body.payload = findUser;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
