const addInvites = require("../models/invititionForm");  // GUest list Table


exports.updateGuest = async(req, res) => {

    const { _id, 
        inviteNo,
        guestName,
        guestDesignation,
        guestDepartment,
        guestNumber,
        guestOfficeNumber,
        guestEmail,
        guestCategory,
        guestAddress
      } = req.body;

        let user = await addInvites.findById(_id)

        user.inviteNo = inviteNo
        user.guestName = guestName
        user.guestDesignation = guestDesignation
        user.guestDepartment = guestDepartment
        user.guestNumber = guestNumber
        user.guestOfficeNumber = guestOfficeNumber
        user.guestEmail = guestEmail
        user.guestCategory = guestCategory
        user.guestAddress = guestAddress


        try {
            let updateEntry = await user.save()
            res.json({ message: "guest updated successfully" })
        }
        catch (err) {
            res.send({errorMessage:"Error updating guest."})
        }
}


exports.deleteGuest = async(req, res) => {
    let {id} = req.body
    let user = await addInvites.findById(id)
    
  try {
      let response = await user.delete()
      res.json({ message: "guest deleted successfully" })

  } catch (error) {
      res.send({ errorMessage: "Error occured while deleting Guest" })
  }
}

