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

    console.log(`User ${user.firstName} ${user.lastName} has connected with socket ${socket.id}`);

    socket.on('private_message', async ({recieverId, text}) => {
        try {
            
            const message = await Message.create({
                senderId: userId,
                recieverId: recieverId,
                text: text
            });

            const messageWithInfo = await Message.findOne({
                _id: message._id
            }).populate("senderId", "firstName lastName");

            const recieverSockets = onlineUsers.get(recieverId);

            if(recieverSockets) {
                recieverSockets.forEach((sockId) => {
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


            if (sockets) {
                sockets.delete(socket.id);

                if (sockets.size === 0) {
                    onlineUsers.delete(userId);

                    io.emit('user_status', {userId, status: 'offline'});

                    console.log(`User ${user.firstName} ${user.lastName} is offline`);
                }
            }

            console.log(`User ${user.firstName} ${user.lastName} has disconnected with socket ${socket.id}`);

                

        });



}

export default chatSocket;