const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authorizationMiddleware = require("../Middleware/authorization");

// * login
router.post("/login", userController.login);

// * register
router.post("/register", userController.register);


module.exports = router; // ! Don't forget to export the router
