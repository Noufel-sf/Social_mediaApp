import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import User, { UserI1 } from '../models/User';

interface DecodedToken {
    id: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserI1;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    

    if(authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];

        try{

            const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as DecodedToken;

            const user = await User.findById(decoded.id).select('-password');

            if(!user){
                return res.status(401).json({ message: 'User not found!' });
            };

            req.user = user;

            next();


        }catch(error){
            res.status(401).json({ message: 'Invalid or expired token', error: error })
        }


    }else{
        res.status(401).json({ message: 'Token not provided!' });
    }




};