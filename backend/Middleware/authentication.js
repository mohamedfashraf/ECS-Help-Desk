const jwt = require("jsonwebtoken");
const secretKey = "s1234rf,.lp";

module.exports = function authenticationMiddleware(req, res, next) {
  const cookie = req.cookies;

  // console.log(req.headers);

  if (!cookie) {
    return res.status(401).json({ message: "No Cookie provided" });
  }
  const token = cookie.token;
  if (!token) {
    return res.status(405).json({ message: "No token provided" });
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
