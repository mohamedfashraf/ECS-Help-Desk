require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/usersRoute");
const chatMessagesRoutes = require('./Routes/chatMessagesRoute');
const securitySettingsRoutes = require('./Routes/securitySettingsRoute');
const knowledgeBaseRoutes = require('./Routes/knowledgeBaseRoute');
const reportsAndAnalyticsRoutes = require('./Routes/reportsAndAnalyticsRoute');
const supportAgentRoutes = require('./Routes/supportAgentRoute');
// JWT Token 

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/SE-Project';
mongoose.connect(mongoURI)


  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Middlewares
app.use(express.json());

// Routes

app.use("/api/users", userRoutes);

app.use("/api/chatMessages", chatMessagesRoutes);

app.use("/api", securitySettingsRoutes);

app.use("/api", knowledgeBaseRoutes);

app.use("/api", reportsAndAnalyticsRoutes);

app.use("/api", supportAgentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
