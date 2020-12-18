const { User, Post, sequelize } = require('../../models');
//
module.exports = {
  //get UserInfo
  get: (req, res) => {
    let { userId } = req.params;
    if (userId === '0') {
      // parameter값이 0이라면 본인 프로필 데이터 요청이므로 jwt토큰에 담긴 userId값으로 탐색
      userId = req.userId;
    }

    try {
      const user = User.findOne({
        attributes: [
          ['id', 'userId'],
          'photo',
          'thumbnail',
          'petName',
          'breed',
        ],
        where: {
          id: userId,
        },
      });

      const postCount = Post.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'postCount']],
        where: {
          userId,
        },
      });

      Promise.all([user, postCount]) //
        .then(([user, postCount]) => {
          if (!user) {
            return res
              .status(400)
              .json({ error: 'request with invalid userId' });
          }

          const result = {
            ...user.toJSON(),
            ...postCount[0].toJSON(),
          };

          res.status(200).json(result);
        });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // delete account
  delete: async (req, res) => {
    const userId = req.userId;

    try {
      await User.destroy({
        where: { id: userId },
      });
      res.status(201).json({ msg: 'user deleted' });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },
};
