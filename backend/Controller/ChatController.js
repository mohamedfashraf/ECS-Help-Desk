// ChatController.js
class ChatController {
    constructor(io) {
        this.io = io;
    }

    onConnection(socket) {
        console.log('A user connected');

        socket.on('chat message', (msg) => this.onChatMessage(socket, msg));
        socket.on('disconnect', () => this.onDisconnect());
    }

    onChatMessage(socket, msg) {
        console.log('Message: ' + msg);
        this.io.emit('chat message', msg); // Broadcast the message
    }

    onDisconnect() {
        console.log('User disconnected');
    }
}

module.exports = ChatController;
