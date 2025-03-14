const jwt = require('jsonwebtoken');
const User = require("../../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;  // Use 'req.cookies' to get the token from cookies

    if (!token) {
      console.log("❌ No token found!");
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.',
      });
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }
};

module.exports = authMiddleware;
