const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided."
      });
    }

    const jwtToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
console.log("Decoded JWT:", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};

const isAdmin = (req, res, next) => {

  console.log("Decoded User:", req.user);

  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access Denied. Admins only."
  });
};
module.exports = {
  authMiddleware,
  isAdmin,
};