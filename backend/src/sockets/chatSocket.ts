import { Server } from 'socket.io'
import { AuthenticatedSocket } from '../middlewares/isAuthSocket';
import { Message } from '../models/Message';

const onlineUsers = new Map<string, Set<string>>();

const chatSocket = (io: Server, socket: AuthenticatedSocket) => {

    const user = socket.user;

    if(!user) return;

    const userId = user._id.toString();

    if(!onlineUsers.has(userId)){
        onlineUsers.set(userId, new Set());
    };

    

    socket.on('request_online_users', () => {
        socket.emit('online_users', Array.from(onlineUsers.keys()));
    });

    socket.broadcast.emit("user_status", {userId: userId, status: 'online'});

    onlineUsers.get(userId)?.add(socket.id);

    console.log(`User ${user.username} has connected with socket ${socket.id}`);

    socket.on('private_message', async ({receiverId, text}) => {
        try {
            
            const message = await Message.create({
                senderId: userId,
               receiverId:receiverId,
                text: text
            });

            const messageWithInfo = await Message.findOne({
                _id: message._id
            }).populate("senderId", "username");

            const receiverSockets = onlineUsers.get(receiverId);

            if(receiverSockets) {
               receiverSockets.forEach((sockId) => {
                    io.to(sockId).emit('private_message', messageWithInfo)
                });
            };

            message.delivered = true

            await message.save();

            socket.emit('message_sent', message);
            

        } catch (error) {
            console.log('Message error', error);
            socket.emit('error', {message: 'failed to send the message'})
        }
    });

        socket.on("disconnect", () => {
            
            const sockets = onlineUsers.get(userId);

            console.log(`User ${user.username} has disconnected with socket ${socket.id}`);

            if (sockets) {
                sockets.delete(socket.id);

                if (sockets.size === 0) {
                    onlineUsers.delete(userId);

                    io.emit('user_status', {userId, status: 'offline'});

                    console.log(`User ${user.username} is offline`);
                }
            }


        });



}

export default chatSocket;