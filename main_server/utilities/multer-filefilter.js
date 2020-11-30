const path = require('path');
//
module.exports = (req, file, callback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|webp/;
  // Check ext & mime
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    return callback('Error::: not allowed. Please check your file type', false);
  }
};
