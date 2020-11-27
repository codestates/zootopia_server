const jwt = require('jsonwebtoken');

module.exports = {
  sign: (userId) => {
    return jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    );
  },
  verify: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw error;
    }
  },
};
