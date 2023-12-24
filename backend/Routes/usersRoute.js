const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
const authorizationMiddleware = require("../Middleware/authorization");

router.put(
  "/setBackupStatus",
  authorizationMiddleware(["admin", "user", "agent", "manager"]),
  UserController.setBackupStatus
);
router.get("/", authorizationMiddleware(["admin"]), UserController.getAllUsers);

router.post(
  "/enable2fa",
  authorizationMiddleware(["user", "agent", "admin"]),
  UserController.enable2FA
);

router.get(
  "/check-2fa-status",
  authorizationMiddleware(["user", "agent", "admin"]),
  UserController.check2FAStatus
);

router.post(
  "/verify2fa",
  authorizationMiddleware(["user", "agent", "admin"]),
  UserController.verifyTwoFactorAuth
);

router.post(
  "/disable2fa",
  authorizationMiddleware(["user", "agent", "admin"]),
  UserController.disableMFA
);

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
