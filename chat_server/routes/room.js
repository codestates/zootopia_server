const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');


const router = express.Router();


router.get('/', async (req, res)=>{ // 
// 유저 아이디가 포함 된 방의 목록을 배열에 담아서 응답    
   
   const room = await Room.find()       
   res.status(201).json(room)
})

router.post('/:id', async(req, res)=> {  // 공용 채팅용 방 만들기 
  try {
    const {title} = req.body
    const room = await Room.create({
      title: title, 
      master: req.params.id               
    }); 
    console.log(room)   
    const io = req.app.get('io');
    io.emit('newRoom', room);
    res.status(201).send('ok')
    
  } catch (error) {
    console.error(error);    
  }
})

// socket.on('newRoom', function (room){
//   // 받은 데이터를 room state에 추가해서 state를 변화시켜 주는 코드를 안에 작성한다. 
// })


module.exports = router;