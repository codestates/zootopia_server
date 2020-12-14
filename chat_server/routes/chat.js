const express = require('express');

const Room = require('../schemas/room')
const Chat = require('../schemas/chat')

const router = express.Router()

router.post('/:roomId',async (req, res)=>{// 채팅 보내기  
  const { roomId } = req.params 
  const { user, text } = req.body
  const io = req.app.get('io'); 
  // 받는 사람의 inRoom status가 true일 경우 -  그냥 메세지 보내고 렌더링 
  // inroom status 가 false일 경우 = inroom status를 false로 바꾸고   
  const chat = await Chat.create({
      room: roomId,
      user: user,
      text: text
  })
  const update = await Room.findById(roomId)

  if(update.type === '비공개 채팅방'){    

    if(update.users[0].id === user && update.users[1].inRoom === false){
      const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.1.unRead': true }},{ new:true }) 
      io.emit('roomUpdate', result)       
    }
    else if(update.users[1].id === user && update.users[0].inRoom === false){
      const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.0.unRead': true}},{ new:true })
      io.emit('roomUpdate', result)
    }  
  
    io.emit('newMessage', chat); 

}else{
    io.emit('newMessage', chat);
}
  res.status(201).send('ok')
})


router.get('/:roomId',async (req, res)=> {// 채팅 렌더링
  //채팅에 들어왔으니 inRoom status 바꿔줌
  //hasRead가 있을 경우 false로 바꿔줌 
  const { roomId } = req.params;
  const id = 5

  const update = await Room.findById(roomId) 
    
  if(update.type === '비공개 채팅방'){

      if(update.users[0].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.0.unRead': false , 'users.0.inRoom': true, 'users.0.isOnline': true }},{ new:true }) 
        io.emit('roomUpdate', result)       
      }
      else if(update.users[1].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.1.unRead': false , 'users.1.inRoom': true,'users.1.isOnline': true }},{ new:true }) 
        io.emit('roomUpdate', result)
      }  
  }  

  const chat = await Chat.find({ room: roomId })   

  res.status(201).send('ok')
})


module.exports = router;