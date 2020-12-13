const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');


const router = express.Router();


router.get('/', async (req, res)=>{ // 
  try{
  // //  공개 채팅방 목록부터 가져온다. 나간 방은 제외하기 
  //  const public = await Room.find({type:'공개 채팅방', left: { $not: { $elemMatch:{ id:3 }}
  // }}) 
  // // console.log(public)
  // //  //비공개 채팅방 목록 
  //  const private = await Room.find({type:"비공개 채팅방", users:{
  //    $elemMatch: { id:4 }}, left: { $not: { $elemMatch: { id: 3 }}} //req.id로 변경해야 함 나중에
  //  })
  // //  console.log(private)
  //  const room = [...public,...private]
    let id = "5fd4ec89761d41cd7dd11253"
  const test1 = await Room.findByIdAndUpdate(id,{$set: { 'users.0': {id:4, unread: true, inRoom:true}}},{new:true})

  console.log(test1)    
   res.status(201).json(test1)
  }
  catch(err){
    console.error(err)
  }
})

router.post('public/:id', async(req, res)=> {  // 공용 채팅용 방 만들기 
  try {
    const {title} = req.body
    const room = await Room.create({
      title: title, 
      master: req.params.id,
      users:[],  
      left:[]
    });     
    req.app.get('io').emit('newRoom', room);
    res.status(201).send('ok')    
  } catch (error) {
    console.error(error);    
  }
})

router.post('private/:id', async(req, res)=> {  // 공용 채팅용 방 만들기 
  try {
    const {title, id} = req.body
    const room = await Room.create({
      title: title, 
      master: req.params.id,
      users:[{

      }],  
      left:[]
    });     
    req.app.get('io').emit('newRoom', room);
    res.status(201).send('ok')      
  } catch (error) {
    console.error(error);    
  }
})

// socket.on('newRoom', function (room){
//   // 받은 데이터를 room state에 추가해서 state를 변화시켜 주는 코드를 안에 작성한다. 
// })


module.exports = router;