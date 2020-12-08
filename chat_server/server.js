const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const app = express();
const port = 3002;
const {verifytoken} = require('./middleware/verifyToken') 
const axios = require('axios');
const connect = require('./schemas')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const roomRouter = require('./routes/room');
const chatRouter = require('./routes/chat');
const errorHandlers = require("./middleware/errorHandler");
const dotenv = require('dotenv');
dotenv.config();

// app.set('port', process.env.PORT);

const port = 3002;
connect();

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

app.use(verifytoken)

app.use('/room',roomRouter)
app.use('/chat',chatRouter)

//에러 핸들링 미들웨어 
// app.use(errorHandlers.notFound);
// if (process.env.ENV === "development") {
//   app.use(errorHandlers.developmentErrors);
// } else {
//   app.use(errorHandlers.productionErrors);
// }

app.use(errorHandlers.developmentErrors);

const server = app.listen(port, ()=> {
    console.log('app is listen on', port)
})

const io = require('socket.io')(server, {
  cors: {
    origin: true,
    credentials: true,
  }
});

app.set('io',io)

io.use((socket, next) =>{
  cookieParser()(socket.request, {}, next);  
  const decoded = jwt.verify(socket.request.cookies.token, 'test');    
  socket.request.userId = decoded.id; 
})


io.on('connection',async (socket) =>{
  console.log('user connected')  
  socket.id = socket.request.userId   
})

