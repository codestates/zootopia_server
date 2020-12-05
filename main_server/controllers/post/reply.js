const { Reply } = require('../../models');
//
module.exports = {
  // new reply *
  post: async (req, res) => {
    const userId = req.userId;
    const { commentId, text } = req.body;
    if (!commentId || !text) {
      return res.status(400).end();
    }

    try {
      const replyCreated = await Reply.create({ userId, commentId, text });
      res.status(201).json({ replyId: replyCreated.id });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // update reply *
  patch: async (req, res) => {
    const userId = req.userId;
    const { replyId, text } = req.body;
    if (!replyId || !text) {
      return res.status(400).end();
    }

    try {
      const replyUpdated = await Reply.update(
        {
          text,
        },
        {
          where: {
            id: replyId,
            userId,
          },
        },
      );
      if (replyUpdated[0] !== 1) {
        return res.status(400).end();
      }
      res.status(201).json({ msg: 'reply updated' });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // delete reply *
  delete: async (req, res) => {
    const userId = req.userId;
    const { replyId } = req.body;
    if (!replyId) {
      return res.status(400).end();
    }

    try {
      const replyDeleted = await Reply.destroy({
        where: { id: replyId, userId },
      });
      if (replyDeleted !== 1) {
        return res.status(400).end();
      }
      res.status(200).json({ msg: 'reply deleted' });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
