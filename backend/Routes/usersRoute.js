const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController"); // Adjust the path to where your UserController is located
const authorizationMiddleware = require("../Middleware/authorization");

router.get("/", authorizationMiddleware(["admin"]), UserController.getAllUsers);

//Place specific routes before the generic :id routes
router.post("/enable2fa", UserController.enable2FA);
router.get("/check-2fa-status", UserController.check2FAStatus); // Corrected to use check2FAStatus
router.post("/verify2fa", UserController.verifyTwoFactorAuth);

router.post(
  "/admin-register",
  authorizationMiddleware(["admin"]),
  UserController.adminRegister
);

router.get(
  "/:id",
  authorizationMiddleware(["user", "agent", "admin"]),
  UserController.getUserById
);

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

module.exports = router;
