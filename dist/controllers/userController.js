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
exports.me = exports.Logout = exports.Login = exports.Register = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        ;
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        ;
        const user = yield User_1.default.create({
            firstName,
            lastName,
            email,
            password
        });
        return res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: (0, generateToken_1.generateAccessToken)(user._id.toString())
        });
    }
    catch (error) {
        res.status(500).json({ message: 'server error!', error: error });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: 'all fields are required' });
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const accessToken = (0, generateToken_1.generateAccessToken)(user._id.toString());
            const refreshToken = (0, generateToken_1.generateRefreshToken)(user._id.toString());
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                // path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
            });
            res.status(200).json({
                _id: user._id,
                email: user.email,
                token: accessToken
            });
        }
        else {
            return res.status(400).json({
                message: 'invalid informations'
            });
        }
        ;
    }
    catch (err) {
        return res.status(500).json({ message: 'server error', error: err });
    }
});
exports.Login = Login;
const Logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'user logged out succesfully' });
};
exports.Logout = Logout;
const me = (req, res) => {
    //@ts-ignore
    res.json(req.user);
};
exports.me = me;
