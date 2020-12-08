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
    type: String,
    required: true,
  },
  text: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.plugin(findOrCreate);

module.exports = mongoose.model('Chat', chatSchema);
