const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Login requires a token (Bearer)",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT SECRET not found");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Expired token",
        errCode: "TOKEN_EXPIRED",
      });
    }
    if (error.name === "JsonWebTokenError" || error.name === "SyntaxError") {
      return res.status(401).json({
        success: false,
        message: "invalid token",
        errCode: "INVALID_TOKEN",
      });
    }

    console.error("AuthMiddleware:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication error",
    });
  }
}

module.exports = authMiddleware;
