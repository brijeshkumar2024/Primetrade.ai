const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// public routes
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// protected routes
router.get('/profile', auth, authCtrl.getProfile);

module.exports = router;
