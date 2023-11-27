const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController"); // Adjust the path to where your UserController is located

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
