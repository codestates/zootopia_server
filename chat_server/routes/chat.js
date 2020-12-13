const express = require('express');

const Room = require('../schemas/room')
const Chat = require('../schemas/chat')

const router = express.Router()

router.post('/:roomId',async (req, res)=>{// 채팅 보내기    
  
  const chat = await Chat.create({
      room: req.params.roomId,
      user: req.body.user,
      text: req.body.text
  })
  const io = req.app.get('io'); 
  io.emit('newMessage', chat);
  res.status(201).send(chat)
})


router.get('/:roomId',async (req, res)=> {// 채팅 받기 
  const chat = await Chat.find({ room: req.params.roomId})  
  res.status(201).send(chat)
})






module.exports = router;