const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const roomSchema = new Schema( {
  title: {
    type:String,
    required: true       
  },
  people:{
    type:Number,
    default:1
  }
   
});

roomSchema.plugin(findOrCreate);

module.exports = mongoose.model('Room', roomSchema);