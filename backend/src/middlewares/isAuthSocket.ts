import { Socket } from "socket.io";
import { UserI1 } from "../models/User";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";

export interface AuthenticatedSocket extends Socket{

    user?: UserI1;
};


export const isAuthSocket = async (socket: AuthenticatedSocket, next: any) => {

    try {
        const token = socket.handshake.auth.token || socket.handshake.headers['authorization'];

        if(!token) {
            return next(new Error('authorization error: no token provided'));
        };

        const actualToken = token.toString().startsWith('Bearer ') ? token.toString().split(' ')[1] : token.toString();

        const decoded = jwt.verify(actualToken, process.env.ACCESS_SECRET!) as JwtPayload;

        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return next(new Error('User Not Found!'))
        }

        socket.user = user;

        next();

    } catch (error) {
        console.log('socket authenticaton failed', error);
        return next(new Error('Authentication failed'));
    }
};