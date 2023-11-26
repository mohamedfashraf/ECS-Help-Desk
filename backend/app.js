require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/usersRoute"); 
const ticketsRoute = require("./Routes/ticketsRoute");

// JWT Token 

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/Se-Db';
mongoose.connect(mongoURI)


  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Middlewares
app.use(express.json()); 

//

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketsRoute);

// Starting the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
