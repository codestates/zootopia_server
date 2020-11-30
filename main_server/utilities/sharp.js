const sharp = require('sharp');

module.exports = {
  //
  original: () => {
    return sharp()
      .resize({
        width: 512,
        height: 512,
        fit: 'inside',
      })
      .toFormat('jpeg')
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      });
  },
  //
  thumbnail: () => {
    return sharp()
      .resize({
        width: 64,
        height: 64,
        fit: 'inside',
      })
      .toFormat('jpeg')
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      });
  },
};
