const jwt = require('jsonwebtoken');
require("dotenv").config()


const verifyUser = (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies?.userInfo;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }

      // Attach user ID to request
      req.user = { id: decoded._id };

      next(); // Proceed to the next middleware/controller
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = verifyUser;
