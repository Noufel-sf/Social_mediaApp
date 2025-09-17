"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)('firstName')
        .notEmpty()
        .withMessage('First name is required!'),
    (0, express_validator_1.body)('lastName')
        .notEmpty()
        .withMessage('Last name is required!'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('A valid email is required!'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters!')
];
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('A valid email is required!'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required!')
];
