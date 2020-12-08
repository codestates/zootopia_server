const jwt = require('jsonwebtoken');

exports.verifytoken = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.cookies.token, 'test');
        console.log('================== token verified!');
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
      } catch (error) {
        return res.status(401).json({ error: '401 Unauthorized' });
      }
    
}