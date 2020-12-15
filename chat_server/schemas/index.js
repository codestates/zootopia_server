const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connect = () => {         
    
    mongoose.connect(process.env.MONGO_URL, {
      dbName: 'test',
      useNewUrlParser: true,
      useCreateIndex: true,
    })
}
  
  module.exports = connect;