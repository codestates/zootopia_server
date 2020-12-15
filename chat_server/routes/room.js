const express = require('express');
const Room = require('../schemas/room');

const router = express.Router();

//채팅 목록 가져오기
router.get('/:id', async (req, res)=>{
  try{
    const { id } = req.params
    //공개 채팅방 목록 가져오기
    const public = await Room.find({type:'공개 채팅방', left: { $not: { $elemMatch:{ id:id }}
  }})   
    // 비공개 채팅방 목록 가져오기
    const private = await Room.find({type:"비공개 채팅방", users:{
     $elemMatch: { id:id }}, left: { $not: { $elemMatch: { id:id }}} 
    })  
    const room = [...public,...private]
  
   res.status(201).json(room)
  
  }
  catch(err){
    next(err)
  }
})

// 공개 채팅방 만들기 
router.post('/public/:id', async(req, res)=> { 
  try {
    const { title } = req.body
    const { id } = req.params
    const room = await Room.create({
      type: '공개 채팅방',
      title: title,       
      users:[{
        id:id       
      }],  
      left:[]
    });
     
    req.app.get('io').emit('newPublic', room);
    res.status(201).send('ok')    
  } 
  catch (err) {
    next(err);    
  }
})

// 비공개 채팅방 만들기 
router.post('/private/:id', async(req, res)=> {  
  try {
    const { myId } = req.body
    const { id } = req.params    
    const room = await Room.create({
      type: '비공개 채팅방',           
      users:[{
        id:myId,
        unRead: false,
        inRoom:false,
        isOnline:true
      },{
        id:id,
        unRead: false,
        inRoom:false,
        isOnline:true
      }],  
      left:[]
    });

    req.app.get('io').emit('newPrivate', room, myId, id);
    res.status(201).send('ok')      
  } 
  catch (err) {
    next(err);    
  }
})

// 방 나가기, 
router.post('/:roomId',async (req, res)=>{
  try{
    const{ id } = req.body
    const { roomId } = req.params

    const room = await Room.findByIdAndUpdate(roomId,{$push: { left: {id:id}}, $pull: {users:{id:id}} },{ new:true })
  
    req.app.get('io').emit('roomUpdate', room)
    res.status(201).send('ok')
 }
 catch(err){
   next(err)
 }
})



module.exports = router;