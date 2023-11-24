const addInvites = require("../models/invititionForm"); // Guest list table


exports.verifyGuestByToken = async (req, res) => {
    let { stringToken } = req.query;
    // console.log("verifyGuestByToken stringToken", stringToken)
    if( stringToken ) {
        let guest = await addInvites.findOne({ stringToken })    
    try {
        if(guest) {
            res.send({ guest, message: "User matched successfully" })
        } 
    } catch (error) {
        res.send({ message: "No such user found" })
    }
    }    
}

exports.markAvailability = async (req, res) => {  
    let { guest_response, _id} = req.body;
    let guest = await addInvites.findOne({ _id })     
    try {
        // console.log("inside try markAvailability", guest)
        if (guest) {
                guest.availability = guest_response;
                let updateEntry = await guest.save()
                res.send({ message: "Availability mark successfully" })
                    
        } else {
            res.status(401).send({message:"user did not matched"})
        }

    } catch (error) {
        res.send({ message: "No such user found" })
    }
}

exports.markPreNavydayAvailability = async (req, res) => {  
    let { guest_response, _id} = req.body;
    let guest = await addInvites.findOne({ _id })     
    try {
        // console.log("inside try markAvailability", guest)
        if (guest) {
                guest.preNavydayAvailability = guest_response;
                let updateEntry = await guest.save()
                res.send({ message: "Availability mark successfully" })
                    
        } else {
            res.status(401).send({message:"user did not matched"})
        }

    } catch (error) {
        res.send({ message: "No such user found" })
    }
}