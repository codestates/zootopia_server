const sharp = require('sharp');

module.exports = {
  //
  original: () => {
    return sharp()
      .resize({
        width: 1024,
        height: 1024,
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
        width: 256,
        height: 256,
        fit: 'inside',
      })
      .toFormat('jpeg')
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      });
  },
};
