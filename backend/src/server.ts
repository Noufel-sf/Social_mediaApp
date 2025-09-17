import http from 'http';
import { Server } from 'socket.io';
import app from './index';
import { isAuthSocket } from './middlewares/isAuthSocket';
import dotenv from 'dotenv';
import connectDB from "./config/db";


import chatSocket from './sockets/chatSocket';

const PORT = process.env.PORT || 8000;
dotenv.config();

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `${process.env.API_URL}`, 
        methods: ["GET", "POST"],
    },
});

io.use(isAuthSocket);

io.on('connection', (socket) => {

    chatSocket(io, socket);

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    })
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





