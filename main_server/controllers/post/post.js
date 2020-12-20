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
    if (postId === undefined) {
      res.status(400).end();
    }

    try {
      const DATA = Post.findOne({
        attributes: [
          'id',
          'text',
          'picture_1',
          'picture_2',
          'picture_3',
          'createdAt',
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
            postId: DATA.id,
            text: DATA.text,
            picture_1: DATA.picture_1,
            picture_2: DATA.picture_2,
            picture_3: DATA.picture_3,
            likeCount: likeCount[0].dataValues.n_id,
            likeChecked: likeFounded ? true : false,
            time: DATA.createdAt,
          };
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

          res.status(200).json({ user, post, comments });
        });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // new post
  post: async (req, res) => {
    console.log('post:125');

    const userId = req.userId;
    const { text } = req.body;
    if (!text || !req.files['image1'][0].transforms) {
      return res.status(400).end();
    }
    console.log('post:130');

    const pictures = {
      picture_1: req.files['image1'][0].transforms.filter(
        (el) => el.id === 'original',
      )[0].location,
      picture_2:
        req.files['image2'] &&
        req.files['image2'][0].transforms.filter(
          (el) => el.id === 'original',
        )[0].location,
      picture_3:
        req.files['image3'] &&
        req.files['image3'][0].transforms.filter(
          (el) => el.id === 'original',
        )[0].location,
      thumbnail: req.files['image1'][0].transforms.filter(
        (el) => el.id === 'thumbnail',
      )[0].location,
    };

    try {
      console.log('post:152');

      const postCreated = await Post.create({
        text,
        userId,
        ...pictures,
      });

      res.status(201).json({
        postId: postCreated.id,
        thumbnail: postCreated.thumbnail,
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // update post *
  patch: async (req, res) => {
    const userId = req.userId;
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res.status(400).end();
    }

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
        // 해당 유저가 작성한 포스트 중 검색 불가
        return res.status(400).end();
      }
      res.status(201).json({ msg: 'post updated' });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // delete post *
  delete: async (req, res) => {
    const userId = req.userId;
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).end();
    }

    try {
      const postDeleted = await Post.destroy({
        where: {
          id: postId,
          userId,
        },
      });

      if (postDeleted !== 1) {
        // 해당 유저가 작성한 포스트 중 검색 불가
        return res.status(403).json({ error: '403 Forbidden' });
      }
      res.status(200).json({ msg: 'post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
