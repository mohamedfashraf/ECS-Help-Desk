require("dotenv").config();
const express = require("express");
const app = express();
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


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/Se_project";
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

app.use("/api/customization", customizationSettingsRoute);

app.use("/api", securitySettingsRoutes);

app.use("/api", knowledgeBaseRoutes);

app.use("/api", reportsAndAnalyticsRoutes);

app.use("/api", supportAgentRoutes);

app.use("/api/v1/tickets", ticketsRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
