const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifytoken = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);        
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
      } catch (error) {
        return res.status(401).json({ error: '401 Unauthorized' });
      }
    
}