//
const { nanoid } = require('nanoid');

module.exports = {
  //
  oAuth: () => {
    const id = nanoid(8);

    return {
      petName: `noob_${id}`,
      breed: `똥개`,
      thumbnail: `https://www.flaticon.com/svg/static/icons/svg/194/194630.svg`,
      photo: `https://www.flaticon.com/svg/static/icons/svg/194/194630.svg`,
    };
  },
  //
  guest: () => {
    const id = nanoid(8);

    return {
      email: `${id}@zootopia.dog`,
      petName: `noob_${id}`,
      breed: `똥개`,
      thumbnail: `https://www.flaticon.com/svg/static/icons/svg/194/194630.svg`,
      photo: `https://www.flaticon.com/svg/static/icons/svg/194/194630.svg`,
    };
  },
};
