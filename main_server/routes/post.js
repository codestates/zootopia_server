const express = require('express');
const router = express.Router();
//
const postController = require('../controllers/post/index.js');

// grid
router.get('/getgridview', postController.grid.getGridView); /* 본인정보 */
router.get('/getgridview/:id', postController.grid.getGridViewId);
router.get('/getlatest', postController.grid.getLatest);

// post
router.get('/:postId', postController.post.get);
router.post('/', postController.post.post);
router.patch('/', postController.post.patch);
router.delete('/', postController.post.delete);

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
