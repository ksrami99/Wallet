const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connection = require('./db')
const rootRouter = require('./routers/index');


const PORT = process.env.PORT;

const app = express();

connection();
app.use(express.json());
app.use(cors());


app.use('/api/v1',rootRouter);


app.listen(3000,() => {
  console.log('listning...');
});
