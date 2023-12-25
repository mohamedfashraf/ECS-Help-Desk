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
const authRoutes = require("./routes/auth");
const authenticationMiddleware = require("./Middleware/authentication");
const userRoutes = require("./routes/usersRoute");
const ticketsRoute = require("./routes/ticketsRoute");
const securitySettingsRoutes = require("./routes/securitySettingsRoute");
const knowledgeBaseRoutes = require("./routes/knowledgeBaseRoute");
const reportsAndAnalyticsRoutes = require("./routes/reportsAndAnalyticsRoute");
const supportAgentRoutes = require("./routes/supportAgentRoute");
const customizationSettingsRoute = require("./routes/customizationSettingsRoute");
const automatedWorkflowsRoutes = require("./routes/automatedWorkflowsRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const emailSystemRoutes = require("./routes/emailSystemRoute");
const queuesRoutes = require("./routes/queuesRoute");
const { performBackup } = require("./Controller/userController");

// Initialize Express app and HTTP server
const app = express();

//google auth2
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const session = require("express-session");


app.use(passport.initialize());
app.use(passport.session());


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
  "mongodb+srv://ECSDBdeployment:eCS123@ecsdbdeployment.7tmnkom.mongodb.net/";
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
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
