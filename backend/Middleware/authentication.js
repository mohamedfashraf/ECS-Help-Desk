const jwt = require("jsonwebtoken");
const secretKey = "s1234rf,.lp";

module.exports = function authenticationMiddleware(req, res, next) {
  // Check if req.cookies is defined before accessing it
  if (!req.cookies) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]; // Assuming "Bearer <token>" format
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }

    // Access user properties directly from the decoded object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  });
};
