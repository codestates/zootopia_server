const { User } = require('../../models');
//
module.exports = {
  // change breed
  patch: async (req, res) => {
    const userId = req.userId;
    const { breed } = req.body;

    try {
      const updatedBreed = await User.update(
        {
          breed,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      // console.log(updatedBreed[0]);
      res.status(201).json({ msg: 'breed updated' });
    } catch (error) {
      throw error;
    }
  },
};
