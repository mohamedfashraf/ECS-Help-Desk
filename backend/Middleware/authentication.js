const jwt = require("jsonwebtoken");
const ChatMessage = require("../Models/liveChatSchema");
const secretKey = "s1234rf,.lp";

class ChatController {
  constructor(io) {
    this.io = io;
    this.io.use((socket, next) => this.authenticateSocket(socket, next)); // Apply authentication to all incoming connections
  }

  authenticateSocket(socket, next) {
    const token = socket.handshake.query.token; // Get token from socket handshake query

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error("Token verification error:", error);
        return next(new Error("Authentication error: Invalid token"));
      }
      socket.user = decoded.user; // Store the decoded user information in the socket
      next();
    });
  }

  onConnection(socket) {
    console.log('A user connected with ID:', socket.user.id);

    socket.on('chat message', (msg) => this.onChatMessage(socket, msg));
    socket.on('disconnect', () => this.onDisconnect());
  }

  async onChatMessage(socket, msg) {
    console.log('Message from user ID', socket.user.id, ': ' + msg);

    // Create a new chat message instance
    const chatMessage = new ChatMessage({
      senderId: socket.user.id, // Use the user ID from the authenticated socket
      message: msg,
      // agentId can be added if you have an agent responding
    });

    try {
      // Save the message to the database
      await chatMessage.save();
      console.log('Message saved to database');
    } catch (error) {
      console.error('Error saving message: ', error);
    }

    this.io.emit('chat message', msg); // Broadcast the message
  }

  onDisconnect() {
    console.log('User disconnected');
  }
}

module.exports = ChatController;
