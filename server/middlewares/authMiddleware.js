const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.vendorInfo || req.cookies.userInfo
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.user = decoded; // Now you can access `req.user._id`
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `${error.message} Invalid or expired token`,
      error : error.message
    });
  }
};
