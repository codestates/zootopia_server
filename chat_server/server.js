const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const app = express();
const {verifytoken} = require('./middleware/verifyToken') 
const connect = require('./schemas')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const roomRouter = require('./routes/room');
const chatRouter = require('./routes/chat');
const dotenv = require('dotenv');
dotenv.config();

const Room = require('./schemas/room');

app.set('port', process.env.PORT);
connect();

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  morgan('combined'),
  cors({
    origin: true,
    credentials: true,
  }),
);
// 요청오면 토큰 유효성 검사하기 
app.use(verifytoken)

// 라우팅
app.use('/room',roomRouter)
app.use('/chat',chatRouter)

// 404 에러 핸들러
app.use((err, req, res, next) => {  
  res.status(404).json('찾으시는 주소가 없습니다')  
});

//배포 단계 서버 에러 핸들러 - 배포 단계에서는 에러 핸들러는 최대한 간단하게 만들어서 사용자가 에러 내용을 보지 못하게 한다. 
app.use((err, req, res, next) => {  
  res.status(500).json('Internal Error');
});

const server = app.listen(app.get('port'))

const io = require('socket.io')(server, {
  cors: {
    origin: true,
    credentials: true,
  }
});

app.set('io',io)

io.use((socket, next) =>{
  cookieParser()(socket.request, {}, next);  
  const decoded = jwt.verify(socket.request.cookies.token, process.env.JWT_SECRET_KEY);     
  socket.request.userId = decoded.id
})

io.on('connection', async (socket) =>{
     
  socket.id = socket.request.userId   
  
  // // 첫 연결 시 온라인 상태로 변경
  const online = await Room.find({type:'비공개 채팅방', users:{ $elemMatch: { id:socket.id }}}) 

    for(let i=0; i< online.length; i++){      
      if(online[i].users[0].id === socket.id){
        const onStatus = await Room.findByIdAndUpdate(online[i]._id,{ $set:{ 'users.0.isOnline': true }},{ new: true })  
        io.emit('roomUpdate', onStatus)      
      }
      else if(online[i].users[1].id === socket.id){
        const onStatus = await Room.findByIdAndUpdate(online[i]._id,{ $set:{ 'users.1.isOnline': true }},{ new: true })
        io.emit('roomUpdate', onStatus)
      }
    }    
     
  
  // 연결 해제시 상태 변경
  socket.on('disconnect', async () => {      
    
    const offline = await Room.find({type:'비공개 채팅방', users:{ $elemMatch: { id:socket.id }}})  

    for(let i=0; i< offline.length; i++){  

      if(offline[i].users[0].id === socket.id){
        const offStatus = await Room.findByIdAndUpdate(offline[i]._id,{ $set:{ 'users.0.inRoom': false, 'users.0.isOnline': false }},{ new: true })
        io.emit('roomUpdate', offStatus)        
      }
      else if(offline[i].users[1].id === socket.id){
        const offStatus = await Room.findByIdAndUpdate(offline[i]._id,{ $set:{ 'users.1.inRoom': false ,'users.1.isOnline': false}},{ new: true })
        io.emit('roomUpdate', offStatus)
      }
    }
   });   
})
