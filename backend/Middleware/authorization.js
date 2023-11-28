module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    const userRoles = req.user.role;
    const hasRequiredRole = userRoles.some(role => roles.includes(role));
    if (!hasRequiredRole)
      return res.status(403).json({ message: "unauthorized access" });
    next();
  };
};