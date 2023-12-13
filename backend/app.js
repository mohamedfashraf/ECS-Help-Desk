// Import required packages and modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

//google auth2

const server = http.createServer(app);
const io = socketIO(server);
// Import routes and middleware
const authRoutes = require("./Routes/auth");
const authenticationMiddleware = require("./Middleware/authentication");
const userRoutes = require("./Routes/usersRoute");
const ticketsRoute = require("./Routes/ticketsRoute");
const securitySettingsRoutes = require("./Routes/securitySettingsRoute");
const knowledgeBaseRoutes = require("./Routes/knowledgeBaseRoute");
const reportsAndAnalyticsRoutes = require("./Routes/reportsAndAnalyticsRoute");
const supportAgentRoutes = require("./Routes/supportAgentRoute");
const customizationSettingsRoute = require("./Routes/customizationSettingsRoute");
const automatedWorkflowsRoutes = require("./Routes/automatedWorkflowsRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const emailSystemRoutes = require("./Routes/emailSytsemRoute");
// Initialize Express app and HTTP server
//google auth2
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const session = require("express-session");

app.use(
  session({
    secret: "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", // Replace with your own secret
    resave: true,
    saveUninitialized: true, // Change to true if you want to store sessions for unauthenticated users
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set CORS options
const corsOptions = {
  origin: "http://localhost:3001/", // Replace with your frontend's origin

  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());


// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/SE-Project";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));


// Import routes and middleware
const authRoutes = require("./Routes/auth");
const authenticationMiddleware = require("./Middleware/authentication");
const userRoutes = require("./Routes/usersRoute");
const ticketsRoute = require("./Routes/ticketsRoute");
const securitySettingsRoutes = require("./Routes/securitySettingsRoute");
const knowledgeBaseRoutes = require("./Routes/knowledgeBaseRoute");
const reportsAndAnalyticsRoutes = require("./Routes/reportsAndAnalyticsRoute");
const supportAgentRoutes = require("./Routes/supportAgentRoute");
const customizationSettingsRoute = require("./Routes/customizationSettingsRoute");
const automatedWorkflowsRoutes = require("./Routes/automatedWorkflowsRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const emailSystemRoutes = require("./Routes/emailSystemRoute");

// Public routes
app.use("/api/v1", authRoutes); // Auth routes (login, register, etc.)

// Protected routes with authentication middleware
app.use("/api/customizationSettings", authenticationMiddleware, customizationSettingsRoute);
app.use("/api/emails", authenticationMiddleware, emailSystemRoutes);
app.use("/api/security-settings", authenticationMiddleware, securitySettingsRoutes);
app.use("/api/knowledgeBase", authenticationMiddleware, knowledgeBaseRoutes);
app.use("/api/reports", authenticationMiddleware, reportsAndAnalyticsRoutes);
app.use("/api/support-agents", authenticationMiddleware, supportAgentRoutes);
app.use("/api/tickets", authenticationMiddleware, ticketsRoute);
app.use("/api/users", authenticationMiddleware, userRoutes);
app.use(
  "/api/automatedWorkflows",
  authenticationMiddleware,
  automatedWorkflowsRoutes
);


// Chat and message routes (assuming these need authentication)
app.use("/api/chat", authenticationMiddleware, chatRoute);
app.use("/api/message", authenticationMiddleware, messageRoute);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set the port for the server
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
