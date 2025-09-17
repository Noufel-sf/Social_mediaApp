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
exports.refreshAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../utils/generateToken");
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'no refresh token provided!' });
    }
    ;
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
        const newAccessToken = (0, generateToken_1.generateAccessToken)(decoded.id);
        return res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({ message: 'refresh token invalid or expired!', error: error });
    }
    ;
});
exports.refreshAccessToken = refreshAccessToken;
