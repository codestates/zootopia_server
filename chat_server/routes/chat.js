const express = require('express');

const Room = require('../schemas/room')
const Chat = require('../schemas/chat')

const router = express.Router()

router.post('/:roomId',(req, res)=>{
  res.send('it works')
})

router.get('/:roomId',(req, res)=> {
    res.send('it works like magic')
})





module.exports = router;