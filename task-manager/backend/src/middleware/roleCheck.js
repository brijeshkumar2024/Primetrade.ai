const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (role !== 'ANY' && String(req.user.role).toLowerCase() !== String(role).toLowerCase()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

module.exports = checkRole;
