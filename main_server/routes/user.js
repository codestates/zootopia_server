const express = require('express');
const router = express.Router();
//
const userController = require('../controllers/user/index.js');

// delete Account
router.delete('/', userController.delete);

// Guest signin
router.get('/guest', userController.guest.get);

// Change petName
router.patch('/petname', userController.petname.patch);

// Change photo
router.patch('./photo', userController.photo.patch);

// Change breed
router.patch('./breed', userController.breed.patch);

module.exports = router;
