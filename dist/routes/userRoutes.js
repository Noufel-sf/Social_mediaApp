"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validations/userValidation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const isAuth_1 = require("../middlewares/isAuth");
const refreshTokenRoutes_1 = require("./refreshTokenRoutes");
const router = (0, express_1.Router)();
router.post('/register', userValidation_1.registerValidator, validateRequest_1.default, userController_1.Register);
router.post('/login', userValidation_1.loginValidator, validateRequest_1.default, userController_1.Login);
router.post('/refresh', refreshTokenRoutes_1.refreshAccessToken);
router.post('/logout', userController_1.Logout);
router.get('/me', isAuth_1.isAuth, userController_1.me);
exports.default = router;
