import { Server } from 'socket.io';

export default class SocketService {
    constructor(server) {
        this.io = new Server(server);
    }

    //to handle socket connections
    handleConnection(callback) {
        this.io.on("connection", (socket) => {
            console.log('connected:', socket.id);
            callback(socket);
        });
    }

    //to listen for custom events
    listenCustomEvent(socket, eventName, callback) {
        socket.on(eventName, (_) => {
            console.log('listenCustomEvent ===>', 'event:', eventName, 'value:', _);
            callback(_);
        });
    }

    //to broadcast to all clients including me
    broadcastToAll(socket, eventName) {
        socket.on(eventName, (_) => {
            console.log('broadcastToAll ===>', 'event:', eventName, 'value:', _);
            this.io.emit(eventName, _);
        });
    }

    //to broadcast to all clients excluding me
    broadcastToOthers(socket, eventName) {
        socket.on(eventName, (_) => {
            console.log('broadcastToOthers ===>', 'event:', eventName, 'value:', _);
            socket.broadcast.emit(eventName, _);
        });
    }

    //to emit to a specific room including me
    emitToRoomIncludeSocket(socket, eventName, eventNameTo) {
        socket.on(eventName, ({ room, message }) => {
            console.log('emitToRoomIncludeSocket ===>', 'event:', eventName, 'room:', room);
            socket.join(room);
            this.io.to(room).emit(eventNameTo, `${socket.id}: ${message}`);
        });
    }

    //to emit to a specific room excluding me
    emitToRoomExcludeSocket(socket, eventName, eventNameTo) {
        socket.on(eventName, (_) => {
            console.log('emitToRoomExcludeSocket ===>', 'event:', eventName, 'room:', _);
            socket.join(_);
            socket.to(_).emit(eventNameTo, `"${socket.id}" has joined the room "${_}".`);
        });
    }
}