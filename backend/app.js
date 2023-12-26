// Import required packages and modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { exec } = require("child_process");
const cron = require("node-cron");

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
const queuesRoutes = require("./Routes/queuesRoute");
const { performBackup } = require("./Controller/userController");

// Initialize Express app and HTTP server
const app = express();

//google auth2


app.use("/auth", authRoutes);

// Set CORS options
const corsOptions = {
  origin:
    "https://vercel.com/yassa122s-projects/ecs-project-clbe/3cWX6RLFjE4YbZeP3BPGipsXTFg8", // Replace with your frontend's origin
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const mongoURI =
  "mongodb+srv://ECSDBdeployment:eCS123@ecsdbdeployment.7tmnkom.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Auth routes (login, register, etc.)
app.use("/api/v1", authRoutes);

// Backup MongoDB Route
// Ensure authentication middleware is used before the "/api/backup" route
app.use("/api/backup", authenticationMiddleware);
app.get("/api/backup", (req, res) => {
  performBackup(req.user); // Assuming req.user is set by authentication middleware
  return res.status(200).json({ message: "Backup initiated" });
});

// Schedule backup using cron job (every 1 minute)
cron.schedule("*/1 * * * *", () => {
  // Trigger the backup function
  performBackup();
});

// Protected routes with authentication middleware
app.use(
  "/api/customizationSettings",
  authenticationMiddleware,
  customizationSettingsRoute
);
app.use("/api/emails", authenticationMiddleware, emailSystemRoutes);
app.use(
  "/api/security-settings",
  authenticationMiddleware,
  securitySettingsRoutes
);
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
app.use("/api/queues", authenticationMiddleware, queuesRoutes);

// Chat and message routes (assuming these need authentication)
app.use("/api/chat", authenticationMiddleware, chatRoute);
app.use("/api/message", authenticationMiddleware, messageRoute);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set the port for the server
const port = process.env.PORT || 8080;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
