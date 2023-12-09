module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Unauthorized access: No user role found" });
    }

    const userRoles = req.user.role;
    const hasRequiredRole = userRoles.some((role) => roles.includes(role));
    if (!hasRequiredRole) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};
