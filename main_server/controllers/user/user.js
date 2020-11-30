const { User } = require('../../models');
//
module.exports = {
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
      throw error;
    }
  },
};
