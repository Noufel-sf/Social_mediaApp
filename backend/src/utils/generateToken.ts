import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string): string => {
    return jwt.sign({ id }, process.env.ACCESS_SECRET!, {
        expiresIn: '1h'
    });
};

export const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, process.env.REFRESH_SECRET!, {
        expiresIn: '7d'
    })
};


