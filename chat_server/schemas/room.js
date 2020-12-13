const mongoose = require('mongoose');
const moment = require('moment')

const { Schema } = mongoose;
const roomSchema = new Schema({  
  type:{
    type:String,
    required: true
  },
  users:[{
    id:Number,
    unread:Boolean,
    inRoom:Boolean,
    _id: false
  }],  
  left:[{
    id:Number
  }],  
  owner: {
    type:Number,
    required: true,
  },   
  createdAt: {
    type: String,
    default: moment().format('YY-MM-DD h:mm a'),
  },
});

module.exports = mongoose.model('Room', roomSchema);
