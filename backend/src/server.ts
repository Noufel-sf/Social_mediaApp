import http from "http";
import { Server } from "socket.io";
import app from "./index";
import { isAuthSocket2, AuthenticatedSocket } from "./middlewares/isAuthSocket";
import dotenv from "dotenv";
import connectDB from "./config/db";
import chatSocket from "./sockets/chatSocket";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(isAuthSocket2);

io.on("connection", (socket) => {
  const authSocket = socket as AuthenticatedSocket;

  if (!authSocket.user) {
    console.warn("⚠️  Socket connected without a user");
    return;
  }

  const userId = authSocket.user._id.toString();
  authSocket.join(userId);
  console.log(`✅ ${userId} joined their room`);

  chatSocket(io, authSocket);
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
