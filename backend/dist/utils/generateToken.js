"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: '7d'
    });
};
exports.generateRefreshToken = generateRefreshToken;
