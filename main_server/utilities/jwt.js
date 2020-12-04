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
  //
  verifyTokenId: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      console.log('================== token verified!');
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ error: '401 Unauthorized' });
    }
  },
  decode: (token) => {
    return jwt.decode(token);
  },
};
