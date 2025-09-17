import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/generateToken';

interface DecodedToken {
    id: string;
}

export const refreshAccessToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken){
        return res.status(401).json({ message: 'no refresh token provided!' });
    };

    try{

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as DecodedToken;

        const newAccessToken = generateAccessToken(decoded.id);

        return res.json({ accessToken: newAccessToken });


    }catch(error){

        return res.status(403).json({ message: 'refresh token invalid or expired!', error: error });

    };
};