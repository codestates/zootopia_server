const express = require('express');

const Room = require('../schemas/room')
const Chat = require('../schemas/chat');


const router = express.Router();


router.get('/', async (req, res)=>{
// 유저 아이디가 포함 된 방의 목록을 배열에 담아서 응답    
  const room = await Room.find( )    
    
   res.status(201).json(room)
})

//클라이언트에서 get요청을 받으면 state를 저장하고 





module.exports = router;