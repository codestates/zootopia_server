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
    if (!transforms) {
      return res.status(400).end();
    }

    const photos = {
      photo: transforms.filter((el) => el.id === 'original')[0].location,
      thumbnail: transforms.filter((el) => el.id === 'thumbnail')[0].location,
    };

    try {
      await User.update(
        {
          ...photos,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      res.status(201).json({ ...photos });
      //
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }),
};
