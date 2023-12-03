require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/usersRoute");
const cookieParser = require("cookie-parser");
const auth = require("./Routes/auth");
const authenticationMiddleware = require("./Middleware/authentication");
const ticketsRoute = require("./Routes/ticketsRoute");
const chatMessagesRoutes = require("./Routes/chatMessagesRoute");
const securitySettingsRoutes = require("./Routes/securitySettingsRoute");
const knowledgeBaseRoutes = require("./Routes/knowledgeBaseRoute");
const reportsAndAnalyticsRoutes = require("./Routes/reportsAndAnalyticsRoute");
const supportAgentRoutes = require("./Routes/supportAgentRoute");
const customizationSettingsRoute = require("./Routes/customizationSettingsRoute");
const express = require("express");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: "http://localhost:3001", // Frontend URL
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/SE-Project";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
app.use(express.json());

app.use("/api/v1", auth);

app.use("/api/v1/users", userRoutes);

app.use("/api/tickets", ticketsRoute);


app.use(authenticationMiddleware);

app.use("/api/customizationSettings", customizationSettingsRoute);

app.use("/api/chatMessages", chatMessagesRoutes);

app.use("/api/security-settings", securitySettingsRoutes);

app.use("/api/knowledgeBase", knowledgeBaseRoutes);

app.use("/api/reports", reportsAndAnalyticsRoutes);

app.use("/api/support-agents", supportAgentRoutes);

app.use("/api/tickets", ticketsRoute);

app.use("/api/users", userRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
