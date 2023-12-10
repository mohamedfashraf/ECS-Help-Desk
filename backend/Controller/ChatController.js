const ChatMessage = require("../Models/liveChatSchema");

class ChatController {
  constructor(io) {
    this.io = io;
  }

  onConnection(socket) {
    console.log("A user connected");

    socket.on("chat message", (data) => this.onChatMessage(socket, data));
    socket.on("disconnect", () => this.onDisconnect());
  }

  async onChatMessage(socket, data) {
    console.log("Message received:", data);

    try {
      const { senderId, agentId, message } = data;

      // Save the message to the database
      const chatMessage = new ChatMessage({
        senderId,
        agentId,
        message,
      });

      await chatMessage.save();

      // Broadcast the message to all connected sockets
      this.io.emit("chat message", chatMessage);
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }
  }

  onDisconnect() {
    console.log("User disconnected");
  }
}

module.exports = ChatController;
