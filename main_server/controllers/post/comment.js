const { Comment, Post, User, Reply } = require('../../models');
//
module.exports = {
  // new comment *
  post: async (req, res) => {
    const userId = req.userId;
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res.status(400).end();
    }

    try {
      await Comment.create({ userId, postId, text });

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: Comment,
            attributes: [['id', 'commentId'], 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: [['id', 'userId'], 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: [['id', 'replyId'], 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: [
                      ['id', 'userId'],
                      'thumbnail',
                      'petName',
                      'breed',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.commentId,
        userId: el.User.userId,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.replyId,
          userId: el.User.userId,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(201).json(comments);
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // update comment *
  patch: async (req, res) => {
    const userId = req.userId;
    const { postId, commentId, text } = req.body;
    if (!postId || !commentId || !text) {
      return res.status(400).end();
    }

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
        return res.status(403).end();
      }

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: Comment,
            attributes: [['id', 'commentId'], 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: [['id', 'userId'], 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: [['id', 'replyId'], 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: [
                      ['id', 'userId'],
                      'thumbnail',
                      'petName',
                      'breed',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.commentId,
        userId: el.User.userId,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.replyId,
          userId: el.User.userId,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(201).json(comments);
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // delete comment *
  delete: async (req, res) => {
    const userId = req.userId;
    const { postId, commentId } = req.body;
    if (!commentId || !postId) {
      return res.status(400).end();
    }

    try {
      const commentDeleted = await Comment.destroy({
        where: { id: commentId, userId },
      });

      if (commentDeleted !== 1) {
        return res.status(403).end();
      }

      const DATA = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: Comment,
            attributes: [['id', 'commentId'], 'text', 'createdAt'],
            include: [
              {
                model: User,
                attributes: [['id', 'userId'], 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: [['id', 'replyId'], 'text', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: [
                      ['id', 'userId'],
                      'thumbnail',
                      'petName',
                      'breed',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const comments = DATA.Comments.map((el) => ({
        commentId: el.commentId,
        userId: el.User.userId,
        thumbnail: el.User.thumbnail,
        petName: el.User.petName,
        breed: el.User.breed,
        text: el.text,
        time: el.createdAt,
        replies: el.Replies.map((el) => ({
          replyId: el.replyId,
          userId: el.User.userId,
          thumbnail: el.User.thumbnail,
          petName: el.User.petName,
          breed: el.User.breed,
          text: el.text,
          time: el.createdAt,
        })),
      }));

      res.status(200).json(comments);
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
