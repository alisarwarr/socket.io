import express from 'express';
import http from 'http';
import SocketService from './SocketHandler.js';


const app = express();
const server = http.createServer(app);
const socketService = new SocketService(server);


socketService.handleConnection((socket) => {

    socketService.broadcastToAll(socket, 'user-message');
    // socketService.broadcastToOthers(socket, 'user-message');
    socketService.emitToRoomExcludeSocket(socket, 'join-room', 'message');
    socketService.emitToRoomIncludeSocket(socket, 'room-message', 'message');

});


app.use('/', express.static("public"));


server.listen(3000, () => console.log('server running at http://localhost:3000'));