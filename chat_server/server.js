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

io.on('connection', async (socket) =>{
  console.log('user connected')  
  socket.id = socket.request.userId     
  // 첫 연결 시 온라인 상태로 변경
  const online = await Room.find({type:'비공개 채팅방', users:{ $elemMatch: { id:socket.id }}}) 

    for(let i=0; i< online.length; i++){      
      if(online[i].users[0].id === socket.id){
         await Room.findByIdAndUpdate(online[i]._id,{ $set:{ 'users.0.isOnline': true }})        
      }
      else if(online[i].users[1].id === socket.id){
        await Room.findByIdAndUpdate(online[i]._id,{ $set:{ 'users.1.isOnline': true }})
      }
    }
     
  // 방 목록에서 다른 방으로 이동할 시 
  socket.on('leaveChat', async (roomId) =>{
    const room = await Room.findByIdAndUpdate(roomId, { $set:{ 'users.0.inRoom': false }})
  })

  // 연결 해제시 상태 변경
  socket.on('disconnect', async () => {
    console.log('user disconneted');
    
    const offline = await Room.find({type:'비공개 채팅방', users:{ $elemMatch: { id:socket.id }}})    
    for(let i=0; i< offline.length; i++){      
      if(offline[i].users[0].id === socket.id){
        const result = await Room.findByIdAndUpdate(offline[i]._id,{ $set:{ 'users.0.inRoom': false, 'users.0.isOnline': false }})        
      }
      else if(offline[i].users[1].id === socket.id){
        const result = await Room.findByIdAndUpdate(offline[i]._id,{ $set:{ 'users.1.inRoom': false ,'users.1.isOnline': false}})
      }
    }
   });   
})

