const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/connection.js');
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let routes = require('./routes/routes.js')
app.use('/api', routes)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is runningss on PORTs ${PORT}`)
  
})
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("mongdb is connected");    
  }
);


