const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // extract token from Bearer scheme
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // token expired or signature invalid
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
