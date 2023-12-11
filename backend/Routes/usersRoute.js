const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController"); // Adjust the path to where your UserController is located
const authorizationMiddleware = require("../Middleware/authorization");

router.get("/", authorizationMiddleware(["admin"]), UserController.getAllUsers);

router.get("/:id", authorizationMiddleware(["user", "agent", "admin"])
    , UserController.getUserById);


router.put(
  "/:id",
  authorizationMiddleware(["admin"]),
  UserController.updateUser
);

router.delete(
  "/:id",
  authorizationMiddleware(["admin"]),
  UserController.deleteUser
);

router.post("/enable2fa", UserController.enable2FA);

router.post("/admin-register", authorizationMiddleware(["admin"])
    , UserController.adminRegister);

module.exports = router;
