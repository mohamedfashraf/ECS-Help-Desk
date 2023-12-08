// Import required packages and modules
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/usersRoute");
const cookieParser = require("cookie-parser");
const auth = require("./Routes/auth");
const authenticationMiddleware = require("./Middleware/authentication");
const ticketsRoute = require("./Routes/ticketsRoute");
const emailSystemRoutes = require("./Routes/emailSytsemRoute");
const securitySettingsRoutes = require("./Routes/securitySettingsRoute");
const knowledgeBaseRoutes = require("./Routes/knowledgeBaseRoute");
const reportsAndAnalyticsRoutes = require("./Routes/reportsAndAnalyticsRoute");
const supportAgentRoutes = require("./Routes/supportAgentRoute");
const customizationSettingsRoute = require("./Routes/customizationSettingsRoute");
const automatedWorkflowsRoutes = require("./Routes/automatedWorkflowsRoute");
const cors = require("cors");
// const liveChatRoute = require("./Routes/liveChatRoute");

const http = require('http');
const socketIO = require('socket.io');
const ChatController = require('./Controller/ChatController'); // Import ChatController

// Set up a basic route to serve an HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Create an HTTP server and attach Socket.IO to it
const server = http.createServer(app);
const io = socketIO(server);

app.use(
  cors({
    origin: "http://localhost:3001", // Frontend URL
    credentials: true,
  })
);

// Initialize ChatController with the Socket.IO instance
const chatController = new ChatController(io);

// Handle WebSocket connections using ChatController
io.on('connection', (socket) => {
  chatController.onConnection(socket);
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/SE-Project";
mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// routes
app.use("/api/v1", auth);
app.use(authenticationMiddleware);
app.use("/api/customizationSettings", customizationSettingsRoute);
app.use("/api/emails", emailSystemRoutes);
app.use("/api/security-settings", securitySettingsRoutes);
app.use("/api/knowledgeBase", knowledgeBaseRoutes);
app.use("/api/reports", reportsAndAnalyticsRoutes);
app.use("/api/support-agents", supportAgentRoutes);
app.use("/api/tickets", ticketsRoute);
app.use("/api/users", userRoutes);
app.use("/api/automatedWorkflows", automatedWorkflowsRoutes);
// app.use("/api/liveChat", liveChatRoute);

// Set the port for the server
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
