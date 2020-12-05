//
const jwtUtility = require('../../utilities/jwt');
const makeProfile = require('../../utilities/makeProfile');
//
const { User } = require('../../models');
//
module.exports = async (req, res) => {
  try {
    const userCreated = await User.create({
      ...makeProfile.guest(),
      type: 'guest',
    });

    // console.log(userCreated.toJSON());
    // sign a JWT token
    const token = jwtUtility.sign(userCreated.id);

    res //
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.codestates-project.tk',
      })
      .json({ msg: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
