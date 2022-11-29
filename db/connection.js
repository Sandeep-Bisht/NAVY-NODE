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




