const express = require('express');
const router = express.Router();
//
const authController = require('../controllers/auth/index.js');

// Github
router.get('/github', authController.github);

// Google
router.get('/google', authController.google);

// Guest signin
router.get('/guest', authController.guest);

// logout
router.post('/logout', authController.logout);

module.exports = router;
