const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username  : {
    type : String,
    unique: true,
    trim:true,
    lowercase:true,
    required: true
  },
  
  password : {
    type : String,
    required: true, 
    minLength:6
  },

  firstname  : {
    type : String,
    required: true,
    trim:true
  },
  
  lastname : {
    type : String,
    trim:true,
    required: true
  },

})

const User = mongoose.model('User', userSchema);
module.exports = User;