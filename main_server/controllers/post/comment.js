const { Comment } = require('../../models');
//
module.exports = {
  // new comment *
  post: async (req, res) => {
    const userId = req.userId;
    const { postId, text } = req.body;

    try {
      const commentCreated = await Comment.create({ userId, postId, text });
      res.status(201).json({ commentId: commentCreated.id });
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  // update comment *
  patch: async (req, res) => {
    const userId = req.userId;
    const { commentId, text } = req.body;

    try {
      const commentUpdated = await Comment.update(
        {
          text,
        },
        {
          where: {
            id: commentId,
            userId,
          },
        },
      );

      if (commentUpdated[0] !== 1) {
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(201).json({ msg: 'comment updated' });
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  // delete comment *
  delete: async (req, res) => {
    const userId = req.userId;
    const { commentId } = req.body;

    try {
      const commentDeleted = await Comment.destroy({
        where: { id: commentId, userId },
      });

      if (commentDeleted !== 1) {
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'comment deleted' });
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
};
