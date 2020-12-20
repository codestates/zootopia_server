const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

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
    isOnline:Boolean,
    _id: false
  }],  
  left:[{
    id:Number,
    _id:false
  }],  
  createdAt: String
});

roomSchema.plugin(findOrCreate);


module.exports = mongoose.model('Room', roomSchema);
