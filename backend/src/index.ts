import express from "express";
import userRouter from "./routes/userRoutes";
import friendRouter from "./routes/friendRoutes";
import messagesRouter from './routes/messagesRoutes';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:5173', // or http://localhost:5500 if using Live Server
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/auth", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/messages", messagesRouter);


app.use(express.static(path.join(__dirname, "..", "frontend")));



export default app;
