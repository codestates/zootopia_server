const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connect = require('./schemas')
const cookieParser = require('cookie-parser');
dotenv.config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const errorHandlers = require("./middleware/errorHandler");
const webSocket = require('./socket');

const app = express();
app.set('port', process.env.PORT);
//기초 세팅 한 번에 몰아서 하기 
app.use(
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(),
    morgan('dev'),
    cors({
      origin: true,
      credentials: true,
    }),
  );
  connect();
// verify token 미들웨어 = 쿠키를 통해서 token을 전달한다는 점을 이해하기 
  app.use((req,res,next)=>{
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        console.log('================== token verified!');
        req.userId = decoded.id;
        next();
      } catch (error) {
        return res.status(401).json({ error: '401 Unauthorized' });
      }    
  })

//에러 핸들링 미들웨어 
app.use(errorHandlers.notFound);
if (process.env.ENV === "development") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

const server = app.listen(app.get('port'), ()=> {
    console.log('app is listen on', app.get('port'))
})

webSocket(server, app)