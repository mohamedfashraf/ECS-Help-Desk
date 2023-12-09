const jwt = require("jsonwebtoken");
const secretKey = "s1234rf,.lp";

module.exports = function authenticationMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded.user;
    next();
  });
};
