const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
const authorizationMiddleware = require("../Middleware/authorization");

router.get("/", authorizationMiddleware(["admin"]), UserController.getAllUsers);

// Place specific routes before the generic :id routes
router.post(
  "/enable2fa",
  authorizationMiddleware(["user"]),
  UserController.enable2FA
);
router.get("/check-2fa-status", UserController.check2FAStatus);
router.post("/verify2fa", UserController.verifyTwoFactorAuth);
router.post("/disable2fa", UserController.disableMFA);
//router.post("/update-mfa-status", UserController.updateMFAStatus);

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

router.put(
  "/updateById/:id",
  authorizationMiddleware(["admin"]),
  UserController.updateById
);

module.exports = router;
