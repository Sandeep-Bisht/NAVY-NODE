const addInvites = require("../models/invititionForm");  // GUest list Table

exports.addGuestList = async (req, res) => {
  let {
    guestName,
    guestDesignation,
    guestDepartment,
    guestNumber,
    guestOfficeNumber,
    guestEmail,
    guestCategory,
    guestAddress,
    invitationStatus,
    availability
  } = req.body;

  if (
    guestName == "" &&
    guestDesignation == "" &&
    guestDepartment == "" &&
    guestNumber == "" &&
    guestOfficeNumber == "" &&
    guestEmail == "" &&
    guestCategory == "" &&
    guestAddress == "" &&
    invitationStatus == "" && 
    availability == ""
  ) {
    return res.send({ message: "please fill the field " });
  }

  let guestList = new addInvites({
    guestName,
    guestDesignation,
    guestDepartment,
    guestNumber,
    guestOfficeNumber,
    guestEmail,
    guestCategory,
    guestAddress,
    invitationStatus,
    availability
  });
  try {
    let saveInvites = await guestList.save();
    res.send({ message: "Guest details saved successfully" });
  } catch (error) {
    res.send({ message: "Error occured while adding Guest", error });
  }
};


exports.getGuestList = async (req, res) => {
    // console.log("getGuestList")
    try {
        let response = await addInvites.find()
        // console.log(response,'res')
        if(response){
            res.send(response)
        } else {
            res.send({message : "No Record found"})
        }
        
    } catch (error) {
        res.send({ message: "Error occured while fetching guest list" })
    }
}
