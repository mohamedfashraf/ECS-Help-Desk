const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authorizationMiddleware = require("../Middleware/authorization");
const passport = require("passport");

// * login
router.post("/login", userController.login);

// * register
router.post("/register", userController.register);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/auth/google/callback/",
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/auth/google/callback/");
});
module.exports = router; // ! Don't forget to export the router
