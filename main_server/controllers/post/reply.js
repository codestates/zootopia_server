const { Comment, Post, User, Reply } = require('../../models');
//
module.exports = {
  // new reply *
  post: async (req, res) => {
    const userId = req.userId;
    const { postId, commentId, text } = req.body;
    if ((!postId, !commentId || !text)) {
      return res.status(400).end();
    }

    try {
      await Reply.create({ userId, commentId, text });

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: User,
            attributes: [
              ['id', 'userId'],
              'photo',
              'thumbnail',
              'petName',
              'breed',
            ],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: ['id', 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: ['id', 'thumbnail', 'petName', 'breed'],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.id,
        userId: el.User.id,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.id,
          userId: el.User.id,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(201).json({ comments });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // update reply *
  patch: async (req, res) => {
    const userId = req.userId;
    const { postId, replyId, text } = req.body;
    if (!postId || !replyId || !text) {
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

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: User,
            attributes: [
              ['id', 'userId'],
              'photo',
              'thumbnail',
              'petName',
              'breed',
            ],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: ['id', 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: ['id', 'thumbnail', 'petName', 'breed'],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.id,
        userId: el.User.id,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.id,
          userId: el.User.id,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(201).json({ comments });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // delete reply *
  delete: async (req, res) => {
    const userId = req.userId;
    const { postId, replyId } = req.body;
    if (!postId || !replyId) {
      return res.status(400).end();
    }

    try {
      const replyDeleted = await Reply.destroy({
        where: { id: replyId, userId },
      });
      if (replyDeleted !== 1) {
        return res.status(400).end();
      }

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: User,
            attributes: [
              ['id', 'userId'],
              'photo',
              'thumbnail',
              'petName',
              'breed',
            ],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: ['id', 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: ['id', 'thumbnail', 'petName', 'breed'],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.id,
        userId: el.User.id,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.id,
          userId: el.User.id,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(200).json({ comments });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
