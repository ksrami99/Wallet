const mongoose = require('mongoose');

const dbConnection =  () => {

  mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connected');
  }).catch((err) => {
    console.log(err);
  })
} 

module.exports = dbConnection;