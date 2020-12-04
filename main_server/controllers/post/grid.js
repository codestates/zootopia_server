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

    if (from === 0) {
      // from 0으로 들어오면, 가장 최신데이터부터
      id = { [Op.is]: true };
    } else {
      // from 값이 있다면 해당 from값부터 기준으로
      id = { [Op.lte]: from };
    }

    try {
      const gridData = await Post.findAll({
        where: {
          userId,
          id,
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
