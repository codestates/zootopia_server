const { Post } = require('../../models');
const { Op } = require('sequelize');
//
module.exports = {
  getGridData: async (req, res) => {
    const { from, offset, count } = req.body;
    let { userId } = req.body;

    if (userId === 0) {
      // userId 0으로 요청 들어오면, 유저 구분없이
      userId = { [Op.is]: true };
    }

    try {
      const gridData = await Post.findAll({
        where: {
          userId,
          id: {
            [Op.lte]: from,
          },
        },
        order: [['id', 'DESC']],
        attributes: [['id', 'postId'], 'thumbnail'],
        offset: offset,
        limit: count,
      });

      // console.log(gridData);
      res.status(200).json(gridData);
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
};
