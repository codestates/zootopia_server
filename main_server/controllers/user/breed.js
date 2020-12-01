const { User } = require('../../models');
//
module.exports = {
  // change breed
  patch: async (req, res) => {
    const userId = req.userId;
    const { breed } = req.body;

    try {
      await User.update(
        {
          breed,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      res.status(201).json({ msg: 'breed updated' });
      //
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
};
