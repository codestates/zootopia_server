const mongoose = require('mongoose');
const moment = require('moment')

const { Schema } = mongoose;
const roomSchema = new Schema({  
  type:{
    type:String,
    required: true
  },
  title:{
    type:String
  },
  users:[{
    id:Number,
    unRead:Boolean,
    inRoom:Boolean,
    _id: false
  }],  
  left:[{
    id:Number,
    _id:false
  }],  
  createdAt: {
    type: String,
    default: moment().format('YY-MM-DD h:mm a'),
  },
});

module.exports = mongoose.model('Room', roomSchema);
