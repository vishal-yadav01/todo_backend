const jwt = require('jsonwebtoken');
const User = require('../model/User.model');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: 0,
        message: 'Token missing. Unauthorized access.',
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Auth error:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: 0,
        message: 'Invalid token.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: 0,
        message: 'Token expired. Please log in again.',
      });
    }

    return res.status(500).json({
      success: 0,
      message: 'Internal server error.',
    });
  }
};
