const axios = require('axios');
const jwtUtility = require('../../utilities/jwt');
//
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;
//
const { User } = require('../../models');
const makeProfile = require('../../utilities/makeProfile');

//
module.exports = async (req, res) => {
  const { code } = req.query;
  // console.log(code);

  try {
    const {
      data: { id_token },
    } = await axios({
      method: 'POST',
      url: `https://oauth2.googleapis.com/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const { email } = await jwtUtility.decode(id_token);

    const user = await User.findOrCreate({
      where: {
        email,
        type: 'google',
      },
      defaults: {
        // petName, breed, thumbnail, photo 생성함수
        ...makeProfile.oAuth(),
      },
    });

    // console.log(user[0].toJSON());
    const token = jwtUtility.sign(user[0].id);

    res
      .status(302)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.codestates-project.tk',
      })
      .redirect(`https://www.codestates-project.tk/main`);
    //
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
