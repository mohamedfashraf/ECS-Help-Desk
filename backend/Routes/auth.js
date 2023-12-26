const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const passport = require("passport");

// login
router.post("/login", userController.login);

// register
router.post("/register", userController.register);
router.post("/verifyMFA", userController.verifyMFA);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard", // Redirect to your frontend dashboard
    failureRedirect: "/login/failed",
  })
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/login"); // Redirect to your frontend login page
});

module.exports = router;
