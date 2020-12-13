const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');


const router = express.Router();


router.get('/:id', async (req, res)=>{ // 
  try{
    const {id} = req.params
  //  공개 채팅방 목록부터 가져온다. 나간 방은 제외하기 
   const public = await Room.find({type:'공개 채팅방', left: { $not: { $elemMatch:{ id:id }}
  }}) 
  // console.log(public)
  //  //비공개 채팅방 목록 
   const private = await Room.find({type:"비공개 채팅방", users:{
     $elemMatch: { id:id }}, left: { $not: { $elemMatch: { id:id }}} //req.id로 변경해야 함 나중에
   })
  //  console.log(private)
   const room = [...public,...private]
  //   let id = "5fd4ec89761d41cd7dd11253"
  // const test1 = await Room.findByIdAndUpdate(id,{$set: { 'users.0': {id:4, unread: true, inRoom:true}}},{new:true}) 
   res.status(201).json(room)
  
  }
  catch(err){
    console.error(err)
  }
})

/*
  공개 채팅방일 경우 참가인원을 추가적으로 렌더링 
  비공개 채팅방일 경우 확인하지 않은 메세지가 있으면 '확인하지 않은 메세지가 있습니다 띄워야 함'
*/

router.post('public/:id', async(req, res)=> {  // 공개 채팅용 방 만들기 
  try {
    const {title} = req.body
    const {id} = req.params
    const room = await Room.create({
      title: title,       
      users:[{
        id:id,
        unread: false,
        inRoom:false
      }],  
      left:[]
    });
             
    req.app.get('io').emit('newPublic', room);
    res.status(201).send('ok')    
  } catch (error) {
    console.error(error);    
  }
})

router.post('private/:id', async(req, res)=> {  // 비공개 채팅용 방 만들기 
  try {
    const {title, myId} = req.body
    const {id} = req.params
    const room = await Room.create({
      title: title,       
      users:[{
        id:myId,
        unread: false,
        inRoom:false
      },{
        id:id,
        unread: false,
        inRoom:false
      }],  
      left:[]
    });

    req.app.get('io').emit('newPrivate', room, myId, id);
    res.status(201).send('ok')      
  } catch (error) {
    console.error(error);    
  }
})

/*
socket.on('newPrivate', function(room,myId,id){
  if(myId나 id가 내 아이디값과 같은 경우){
    룸 스테이트에 추가한다.
  }
})

socket.on('newPublic', function(room){
  룸 스테이트에 추가한다.
})

state에서 room 정보와 일치하는 배열을 찾고 splice 한다. 
*/

router.post('/:roomId',async (req, res)=>{// 방 나가기, 
  const{ id } = req.body
  const {roomId} = req.params

  const room = await Room.findByIdAndUpdate(roomId,{$push: { left: {id:id}}, $pull: {users:{id:id}} },{ new:true })  
  res.status(201).send('ok')
})



module.exports = router;