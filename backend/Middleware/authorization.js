module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    //console.log("User in req:", req.user); // Debugging statement

    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Unauthorized access: No user role found" });
    }

    const userRoles = req.user.role;
    // console.log("User roles:", userRoles); // Debugging statement

    const hasRequiredRole = userRoles.some(role => roles.includes(role));
    // console.log("Has required role:", hasRequiredRole); // Debugging statement


    if (!hasRequiredRole) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};
