const express = require('express');
const router = express.Router();
const upload = require('../../utilities/multer-transform');
const { User } = require('../../models');
//
module.exports = {
  // change photo
  post: router.use('/', upload.single('image'), async (req, res) => {
    const userId = req.userId;
    const { transforms } = req.file;

    const photos = {
      photo: transforms.filter((el) => el.id === 'original')[0].location,
      thumbnail: transforms.filter((el) => el.id === 'thumbnail')[0].location,
    };

    const photoUpdated = await User.update(
      {
        ...photos,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    // console.log(photoUpdated[0]);
    if (photoUpdated[0] === 1) {
      res.status(201).json({ ...photos });
    } else {
      res.status(400).json({ error: '400' });
    }
  }),
};
