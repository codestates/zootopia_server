//
const { nanoid } = require('nanoid');

module.exports = {
  //
  oAuth: () => {
    const id = nanoid(10);

    return {
      petName: `이름모를강아지_${id}`,
      breed: `똥개`,
      thumbnail: `https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg`,
      photo: `https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg`,
    };
  },
  //
  guest: () => {
    const id = nanoid(10);

    return {
      email: `${id}@zootopia.dog`,
      petName: `이름모를강아지_${id}`,
      breed: `똥개`,
      thumbnail: `https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg`,
      photo: `https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg`,
    };
  },
};
