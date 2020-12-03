const { Post } = require('../../models');
//
module.exports = {
  getLatest: async (req, res) => {
    // const userId = req.userId;
    const { offset, count } = req.body;

    try {
      const gridData = await Post.findAll({
        order: [['id', 'DESC']],
        attributes: [['id', 'postId'], 'thumbnail'],
        offset: offset,
        limit: count,
      });

      // console.log(gridData);
      res.status(200).json(gridData);
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },

  getGridById: (req, res) => {
    // params 0이면 본인 데이터
  },
};
