"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 8000;
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500", // or http://localhost:5500 if using Live Server
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use('/api/auth/', userRoutes_1.default);
app.use('/api/friends/', friendRoutes_1.default);
app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
});
