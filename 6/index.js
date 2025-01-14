import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);


//handle Socket.IO connections
io.on("connection", (socket) => {
    console.log('user is connected:', socket.id);
    //listen for a custom event
    socket.on('join-room', (room) => {
        console.log(`user is connected: ${socket.id} and room is: ${room}`);
        socket.join(room);
      //socket.to(room) ====> is used to emit the message to all sockets in the specified room, excluding the socket
      //io.to(room)     ====> is used to emit the message to all sockets in the specified room, including the socket
        socket.to(room).emit('message', `"${socket.id}" has joined the room "${room}".`);
      //socket.to(room).emit('message', `"${socket.id}" has joined the room "${room}".`);
    });
    //listen for a custom event
    socket.on('room-message', ({ room, message }) => {
        console.log(`user is connected: ${socket.id} and message is: ${room}`);
      //socket.to(room) ====> is used to emit the message to all sockets in the specified room, excluding the socket
      //io.to(room)     ====> is used to emit the message to all sockets in the specified room, including the socket
      //socket.to(room).emit('message', `${socket.id}: ${message}`);
        io.to(room).emit('message', `${socket.id}: ${message}`);
    });
});


app.use('/', express.static("public"));


server.listen(3000, () => console.log('server running at http://localhost:3000'));