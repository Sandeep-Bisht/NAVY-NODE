const addInvites = require("../models/invititionForm");

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
  } = req.body;

  if (
    guestName == "" &&
    guestDesignation == "" &&
    guestDepartment == "" &&
    guestNumber == "" &&
    guestOfficeNumber == "" &&
    guestEmail == "" &&
    guestCategory == "" &&
    guestAddress == ""
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
  });
  try {
    let saveInvites = await guestList.save();
    res.send({ message: "Guest details saved successfully" });
  } catch (error) {
    res.send({ message: "Error occured while adding Guest", error });
  }
};


exports.getGuestList = async (req, res) => {
    try {
        let response = await addInvites.find()

        if(response){         
            res.send(response)
        } else {
            res.send({message : "No Record found"})
        }
        
    } catch (error) {
        res.send({ message: "Error occured while fetching guest list" })
    }
}
