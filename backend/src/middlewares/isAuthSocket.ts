import { Socket } from "socket.io";
import { UserI1 } from "../models/User";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";
import { parse } from 'cookie';

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


export const isAuthSocket2 = async (socket: AuthenticatedSocket, next: any) => {

    try {
        // 1. Extract cookies from handshake headers
        const cookies = parse(socket.handshake.headers.cookie || "");

        
        // 2. Get the access token (assuming you named it "accessToken")
        const token = cookies.accessToken;

        

        if (!token) {
        return next(new Error("No token provided"));
        }

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;


        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return next(new Error('User Not Found!'))
        }

        // 4. Attach user info to socket
        socket.user = user;

        next(); // ✅ allow connection
    }catch (err) {
        console.log(err);
        next(new Error("Authentication error"));

    }

};