const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New Connection", socket.id);

    // listen to the connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({ userId, socketId: socket.id });
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    // listen to the send message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.receiverId);

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    // listen to the disconnect
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(4000);