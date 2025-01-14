import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);


//handle Socket.IO connections
io.on("connection", (socket) => {
    console.log('user is connected', socket.id);
    //listen for a custom event
    socket.on('user-message', (message) => {
        console.log('user message', message);
        //broadcast to all clients
        io.emit('message', message);
    });
});


app.use('/', express.static("public"));


server.listen(3000, () => console.log('server running at http://localhost:3000'));