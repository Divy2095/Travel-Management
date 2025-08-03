const jwt = require("jsonwebtoken");
const db = require("../database/db");

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const [user] = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (!user || user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    req.user = user[0];
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

// Grant access to specific roles
exports.admin = (req, res, next) => {
  if (req.user && req.user.login_type === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Not authorized to access this route as admin",
    });
  }
};
