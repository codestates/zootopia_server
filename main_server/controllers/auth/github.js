const axios = require('axios');
const jwtUtility = require('../../utilities/jwt');
//
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
//
const { User } = require('../../models');
const makeProfile = require('../../utilities/makeProfile');

//
module.exports = async (req, res) => {
  const { code } = req.query;

  try {
    const {
      data: { access_token },
    } = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      headers: {
        accept: 'application/json',
      },
    });

    // console.log(access_token);
    const getData = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    // console.log(getData.data[0].email);
    const user = await User.findOrCreate({
      where: {
        email: getData.data[0].email,
        type: 'github',
      },
      defaults: {
        // petName, breed, thumbnail, photo 생성함수
        ...makeProfile.oAuth(),
      },
    });

    // console.log(user[0].toJSON());
    // sign a JWT token
    const token = jwtUtility.sign(user[0].id);

    res
      .status(302)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.codestates-project.tk',
      })
      .redirect(`https://www.codestates-project.tk`);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
