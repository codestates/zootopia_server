const {
  Post,
  User,
  Comment,
  Reply,
  User_like_post,
  sequelize,
} = require('../../models');

module.exports = {
  // get post info
  get: (req, res) => {
    const userId = req.userId;
    const { postId } = req.params;

    try {
      const DATA = Post.findOne({
        attributes: [
          ['id', 'postId'],
          'text',
          'picture_1',
          'picture_2',
          'picture_3',
          ['createdAt', 'time'],
        ],
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
            attributes: [['id', 'commentId'], 'text', ['createdAt', 'time']],
            include: [
              {
                model: User,
                attributes: [['id', 'userId'], 'thumbnail', 'petName', 'breed'],
              },
              {
                model: Reply,
                attributes: [['id', 'replyId'], 'text', ['createdAt', 'time']],
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

      const likeCount = User_like_post.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'n_id']],
        where: {
          postId,
        },
      });
      // console.log(likeCount[0].dataValues.n_id);

      const likeFounded = User_like_post.findOne({
        where: {
          userId,
          postId,
        },
      });
      // console.log(likeFounded);

      Promise.all([DATA, likeCount, likeFounded]) //
        .then(([DATA, likeCount, likeFounded]) => {
          // DATA transform for Client
          const user = DATA.User;
          const post = {
            postId: DATA.postId,
            text: DATA.text,
            picture_1: DATA.picture_1,
            picture_2: DATA.picture_2,
            picture_3: DATA.picture_3,
            likeCount: likeCount[0].dataValues.n_id,
            likeChecked: likeFounded ? true : false,
            time: DATA.time,
          };
          const comments = DATA.Comments.map((el) => ({
            commentId: el.commentId,
            userId: el.User.userId,
            thumbnail: el.User.thumbnail,
            petName: el.User.petName,
            breed: el.User.breed,
            text: el.text,
            time: el.time,
            replies: el.Replies.map((el) => ({
              replyId: el.replyId,
              userId: el.User.userId,
              thumbnail: el.User.thumbnail,
              petName: el.User.petName,
              breed: el.User.breed,
              text: el.text,
              time: el.time,
            })),
          }));

          res.status(200).json({ user, post, comments });
        });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  // new post
  post: async (req, res) => {
    const userId = req.userId;
    const { text } = req.body;
    const transforms = req.files.map((el) => el.transforms);

    const pictures = {
      picture_1: transforms[0].filter((el) => el.id === 'original')[0].location,
      picture_2:
        transforms[1] &&
        transforms[1].filter((el) => el.id === 'original')[0].location,
      picture_3:
        transforms[2] &&
        transforms[2].filter((el) => el.id === 'original')[0].location,
      thumbnail: transforms[0].filter((el) => el.id === 'thumbnail')[0]
        .location,
    };

    try {
      const postCreated = await Post.create({
        text,
        ...pictures,
        userId,
      });

      res.status(201).json({
        postId: postCreated.id,
        thumbnail: postCreated.thumbnail,
      });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  // update post *
  patch: async (req, res) => {
    const userId = req.userId;
    const { postId, text } = req.body;

    try {
      const postUpdated = await Post.update(
        {
          text,
        },
        {
          where: {
            id: postId,
            userId,
          },
        },
      );
      if (postUpdated[0] !== 1) {
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(201).json({ msg: 'post updated' });
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  // delete post *
  delete: async (req, res) => {
    const userId = req.userId;
    const { postId } = req.body;

    try {
      const postDeleted = await Post.destroy({
        where: { id: postId, userId },
      });

      if (postDeleted !== 1) {
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'post deleted' });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
};
