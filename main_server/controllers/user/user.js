const { User } = require('../../models');
//
module.exports = {
  //get UserInfo
  get: async (req, res) => {
    let { userId } = req.params;

    if (userId === '0') {
      // parameter값이 0이라면 본인 프로필 데이터 요청이므로 jwt토큰에 담긴 userId값으로 탐색
      userId = req.userId;
    }

    try {
      const user = await User.findOne({
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

      res.status(200).json(user);
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
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
      res.status(400).end();
    }
  },
};
