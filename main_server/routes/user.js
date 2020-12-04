const express = require('express');
const router = express.Router();
//
const userController = require('../controllers/user/index.js');

// User
router.get('/:userId', userController.user.get);
router.delete('/', userController.user.delete);

// Change petName
router.patch('/petname', userController.petname.patch);

// Change photo
router.post('/photo', userController.photo.post);

// Change breed
router.patch('/breed', userController.breed.patch);

module.exports = router;
