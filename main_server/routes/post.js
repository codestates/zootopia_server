const express = require('express');
const router = express.Router();
//
const postController = require('../controllers/post/index.js');

// post
router.get('/', postController.get);
router.post('/', postController.post);
router.patch('/', postController.patch);
router.delete('/', postController.delete);

// post/comment
router.post('/comment', postController.comment.post);
router.patch('/comment', postController.comment.patch);
router.delete('/comment', postController.comment.delete);

// post/reply
router.post('/reply', postController.reply.post);
router.patch('/reply', postController.reply.patch);
router.delete('/reply', postController.reply.delete);

// toggle LIKE
router.post('/togglelike', postController.toggleLike.post);

module.exports = router;
