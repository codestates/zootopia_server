const express = require('express');
const router = express.Router();
//
const authController = require('../controllers/auth/index.js');

// Github
router.get('/github', authController.github);

// Google
router.get('/google', authController.google);

module.exports = router;
