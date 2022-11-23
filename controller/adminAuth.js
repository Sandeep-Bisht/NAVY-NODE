//let admin = require('../models/adminAuth')
let registration = require("../models/registration");
exports.getUsers = async (req, res) => {
    let { userEmail, password } = req.body
    if (userEmail == "" && password == "") {
        return res.send({ message: "Please fill the field" })
    }
    // console.log('get users hit', req)
    let user = await registration.findOne({ userEmail }) 
    
    try {
        // console.log("inside try", user)
        if (user) {
            if(user.userEmail.trim().toLowerCase() == userEmail.trim().toLowerCase() &&
            user.password.trim().toLowerCase() == password.trim().toLowerCase()) {
                res.send({ message: "Logged in successfully" })
            }         
        } else {
            res.status(401).send({message:"Please enter valid email and Pass"})
        }
              
        //let response = await registration.find({})
        //res.send(response)

    } catch (error) {
        res.send({ message: "No such user found" })
    }
}