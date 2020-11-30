const { Reply } = require('../../models');
//
module.exports = {
  // new reply *
  post: async (req, res) => {
    const userId = req.userId;
    const { commentId, text } = req.body;

    try {
      const replyCreated = await Reply.create({ userId, commentId, text });
      res.status(201).json({ replyId: replyCreated.id });
      //
    } catch (error) {
      throw error;
    }
  },

  // update reply *
  patch: async (req, res) => {
    const userId = req.userId;
    const { replyId, text } = req.body;

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
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(201).json({ msg: 'reply updated' });
      //
    } catch (error) {
      throw error;
    }
  },

  // delete reply *
  delete: async (req, res) => {
    const userId = req.userId;
    const { replyId } = req.body;

    try {
      const replyDeleted = await Reply.destroy({
        where: { id: replyId, userId },
      });
      if (replyDeleted !== 1) {
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'reply deleted' });
      //
    } catch (error) {
      throw error;
    }
  },
};
