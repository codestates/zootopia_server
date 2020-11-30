const { User } = require('../../models');
//
module.exports = {
  // change petName
  // 펫네임 중복불가, 중복시 중복에러 메시지 줘야함
  patch: async (req, res) => {
    const userId = req.userId;
    const { petName } = req.body;

    try {
      const updatedPetName = await User.update(
        {
          petName,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      // console.log(updatedPetName[0]);
      res.status(201).json({ msg: 'petName updated' });
    } catch (error) {
      // 중복에러 처리
      throw error;
    }
  },
};
