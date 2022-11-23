const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.db_url, {
    auth: {
        "username": "nhodehradun",
        "password": "nhodoon1234",
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log("inside then")
}).catch((err) => {
    console.log("inside catch", err)
})

// const mongoose =require('mongoose')
// require('dotenv').config()
// module.exports = function(){
//     mongoose.connect(process.env.db_url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: true,})
//     mongoose.connection.on('connected',()=>{
//         console.log("Database is connected ")
//     })
// }


