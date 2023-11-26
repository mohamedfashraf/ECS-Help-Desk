require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/usersRoute"); // Adjust path as needed
// JWT Token Generation Example

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/Se_project';
mongoose.connect(mongoURI)


  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Middlewares
app.use(express.json()); // If you are expecting JSON payloads in your requests

// Routes
// Define your routes here

app.use("/api/users", userRoutes);

// Starting the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
