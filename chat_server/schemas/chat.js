const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')


const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
  room: {
    type: ObjectId,
    required: true,
    ref: 'Room',
  },
  user: {
    type: Number,
    required: true,
  },
  text: String, 
  createdAt:String,
  });

chatSchema.plugin(findOrCreate);


module.exports = mongoose.model('Chat', chatSchema);
