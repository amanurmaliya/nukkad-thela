const jwt = require('jsonwebtoken');
require("dotenv").config()

const verifyVendor = (req, res, next) => {
  const token = req.cookies?.vendorInfo;  // Ensure this name matches the frontend
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.vendorId = decoded?._id; // Attach vendor info to request
    next();
  });
};

module.exports = verifyVendor