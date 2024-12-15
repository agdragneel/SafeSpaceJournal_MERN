const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If there's no token, the user is considered unauthenticated
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and extract the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded user information to the request object

    // Check if the user has a valid session and proceed
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// Middleware to handle unauthenticated routes
const unauthenticatedMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If there's a token, the user is authenticated
  if (token) {
    return res.status(403).json({ error: 'User is already authenticated' });
  }

  // If no token is present, proceed to the next middleware or route handler
  next();
};

module.exports = { authMiddleware, unauthenticatedMiddleware };
