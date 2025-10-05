import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import express from "express";
import userRouter from "./routes/userRoutes";
import friendRouter from "./routes/friendRoutes";
import messagesRouter from './routes/messagesRoutes';
import storyRouter from './routes/StoriesRoutes';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import postsRouter from "./routes/PostsRoutes";




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

app.use("/api/posts", postsRouter);
app.use("/api/auth", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/stories", storyRouter);
app.use("/api/messages", messagesRouter);


app.use(express.static(path.join(__dirname, "..", "frontend")));



export default app;
