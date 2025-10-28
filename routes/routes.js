const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { signup, login, logout } = require('../controllers/User.controller');

router.post('/signup', signup);
router.post('/login', login);

router.post('/logout', logout);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});

module.exports = router;
