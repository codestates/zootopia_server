const { User } = require('../../models');
//
module.exports = {
  // change petName
  patch: async (req, res) => {
    const userId = req.userId;
    const { petName } = req.body;

    const check = await User.findOne({
      attributes: ['id'],
      where: {
        petName,
      },
    });
    // 이미 존재하면 409에러
    if (check) {
      res.status(409).send('error::: 409 Conflict');
    }

    try {
      await User.update(
        {
          petName,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      res.status(201).json({ msg: 'petName updated' });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
};
