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
  .post(
    // middleware / Multer
    upload.fields([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
    ]),
    postController.post.post,
  )
  .patch(postController.post.patch)
  .delete(postController.post.delete);

// post/:postId
router.get('/:postId', postController.post.get);

// post/togglelike
router.post('/togglelike', postController.toggleLike.post);

// /post/grid
router.post('/grid', postController.grid.getGridData);

module.exports = router;
