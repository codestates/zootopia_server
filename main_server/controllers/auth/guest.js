//
const jwtUtility = require('../../utilities/jwt');
const makeProfile = require('../../utilities/makeProfile');
//
const { User } = require('../../models');
//
module.exports = {
  // guest signin
  get: async (req, res) => {
    const userCreated = await User.create({
      ...makeProfile.guest(),
    });

    // console.log(userCreated.toJSON());
    // sign a JWT token
    const token = jwtUtility.sign(userCreated.id);

    res //
      .status(200)
      .cookie('token', token, {
        // httpOnly: true,
        // secure: true,
        // sameSite: 'none',
      })
      .json({ msg: 'success' });
  },
};
