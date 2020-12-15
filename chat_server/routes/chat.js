const express = require('express');

const Room = require('../schemas/room')
const Chat = require('../schemas/chat')

const router = express.Router()

// 채팅 보내기  
router.post('/:roomId',async (req, res)=>{
  try {
    const { roomId } = req.params 
    const { user, text } = req.body
    const io = req.app.get('io'); 
  
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
  }
  catch(err){
    next(err)
  }
})

// 채팅 렌더링
router.get('/:roomId',async (req, res)=> {
  try{
    const { roomId } = req.params;
    const id = req.id

    const update = await Room.findById(roomId) 
    
    if(update.type === '비공개 채팅방'){

      if(update.users[0].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.0.unRead': false , 'users.0.inRoom': true, 'users.0.isOnline': true }},{ new:true }) 
        req.app.get('io').emit('roomUpdate', result)       
      }
      else if(update.users[1].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.1.unRead': false , 'users.1.inRoom': true,'users.1.isOnline': true }},{ new:true }) 
        req.app.get('io').emit('roomUpdate', result)
      }  
    }  

    const chat = await Chat.find({ room: roomId })    

    res.status(201).send(chat)
  }
  catch(err){
    next(err)
  }
})

// 다른 채팅방으로 옮겨 갈 시 
router.post('/leave/:roomId',async (req, res)=>{ 
  try{
    const { roomId } = req.params 
    const { id } = req.body
    const io = req.app.get('io'); 
  
 
    const update = await Room.findById(roomId) 
    if(update.type === '비공개 채팅방'){
    
      if(update.users[0].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.0.inRoom': false}},{ new: true })
        io.emit('roomUpdate', result)        
      }
      else if(update.users[1].id === id){
        const result = await Room.findByIdAndUpdate(roomId,{ $set:{ 'users.1.inRoom': false}},{ new: true })
        io.emit('roomUpdate', result)
      }
    }
  res.status(201).send('ok')
  }
  catch(err){
    next(err)
  }
})



module.exports = router;