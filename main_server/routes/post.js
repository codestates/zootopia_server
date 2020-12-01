const express = require('express');
const router = express.Router();
const upload = require('../utilities/multer-transform');

const postController = require('../controllers/post/index.js');

// post/comment
router
  .route('/comment')
  .post(postController.comment.post)
  .patch(postController.comment.patch)
  .delete(postController.comment.delete);

// post/reply
router
  .route('/reply')
  .post(postController.reply.post)
  .patch(postController.reply.patch)
  .delete(postController.reply.delete);

// post
router
  .route('/')
  .post(upload.array('image') /* 필요시 fields로 */, postController.post.post)
  .patch(postController.post.patch)
  .delete(postController.post.delete);

// post/:postId
router.get('/:postId', postController.post.get);

// post/togglelike
router.post('/togglelike', postController.toggleLike.post);

// /post/getgridview
router.get('/getgridview', postController.grid.getGridView); /* 본인정보 */
router.get('/getgridview/:id', postController.grid.getGridViewId);
router.get('/getlatest', postController.grid.getLatest);

module.exports = router;
