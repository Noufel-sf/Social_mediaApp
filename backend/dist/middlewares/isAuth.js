"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET);
            const user = yield User_1.default.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found!' });
            }
            ;
            // @ts-ignore
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Invalid or expired token', error: error });
        }
    }
    else {
        res.status(401).json({ message: 'Token not provided!' });
    }
});
exports.isAuth = isAuth;
