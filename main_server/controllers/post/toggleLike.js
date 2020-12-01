const { User_like_post } = require('../../models');
//
module.exports = {
  // toggle like btn
  post: async (req, res) => {
    const userId = req.userId;
    const { postId, likeChecked } = req.body;
    // console.log(userId, postId, likeChecked);

    if (likeChecked) {
      try {
        await User_like_post.findOrCreate({
          where: {
            userId,
            postId,
          },
        });
        res.status(201).send('1');
        //
      } catch (error) {
        console.error(error);
        res.status(400).end();
      }
      //
    } else {
      try {
        await User_like_post.destroy({
          where: {
            postId,
            userId,
          },
        });
        res.status(201).send('-1');
        //
      } catch (error) {
        console.error(error);
        res.status(400).end();
      }
    }
  },
};
