const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token provided');
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500);
      throw new Error('JWT_SECRET is not configured');
    }

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      res.status(401);
      error.message = 'Not authorized, invalid or expired token';
    }
    next(error);
  }
};

module.exports = authMiddleware;
