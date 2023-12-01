const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController"); // Adjust the path to where your UserController is located
const authorizationMiddleware = require("../Middleware/authorization");

router.get("/", authorizationMiddleware(["user"])
    , UserController.getAllUsers);

router.get("/:id", authorizationMiddleware(["user"])
    , UserController.getUserById);

router.put("/:id", authorizationMiddleware(["admin"])
    , UserController.updateUser);

router.delete("/:id", authorizationMiddleware(["admin"])
    , UserController.deleteUser);

module.exports = router;
