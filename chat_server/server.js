const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const app = express();

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

const Room = require('./schemas/room');
const Chat = require('./schemas/chat');

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

// app.use(verifytoken)

app.use('/room',roomRouter)
app.use('/chat',chatRouter)

app.use('/test',(req,res,next)=>{
  console.log('it works')
  res.send([1,2,3,4,5])
})
//에러 핸들링 미들웨어 
// app.use(errorHandlers.notFound);
// if (process.env.ENV === "development") {
//   app.use(errorHandlers.developmentErrors);
// } else {
//   app.use(errorHandlers.productionErrors);
// }
app.use(errorHandlers.catchErrors)
app.use(errorHandlers.notFound);
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
  // const decoded = jwt.verify(socket.request.cookies.token, 'test');    
  socket.request.userId = 5; 
})

io.on('connection',async (socket) =>{
  console.log('user connected')  
  socket.id = socket.request.userId 
  //맨 처음에 접속 했을 때 방 목록을 받아옴 
  // const room = await Room.find({})  
  // socket.emit('getRoom', room)

  socket.on('joinRoom', async (roomId) => {
    const chat = await Chat.find({room: roomId})
    const update = await Room.findOneAndUpdate({_id:roomId}, {$inc : {'count' : 1}}, {
      new: true
    })
    socket.join(roomId)
    socket.emit('renderChat', chat)
    io.emit('roomUpdate', update)    
  })
  
  socket.on('leaveRoom', async (roomId) =>{
    const update = await Room.findOneAndUpdate({_id:roomId}, {$inc : {'count' : -1}})
    socket.leave(roomId)
    io.emit('roomUpdate', update)
  })

  socket.on('disconnect', () => {
    console.log('user disconneted');
  });
})

