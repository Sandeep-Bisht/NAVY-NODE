const markAttendance = require("../models/attendanceMaster"); // Attendance list list Table

exports.markAttendance = async (req, res) => {
  let uniqueKey = "111";
  let {
    guestId,
    guestName,
    inviteNo,
    guestDepartment,
    guestNumber,
    guestCategory,
    attendentDate,
    adminPassword,
  } = req.body;

  if (uniqueKey == adminPassword) {
    // let response = await markAttendance.find({ guestId, attendentDate:'11/30/2022' } );
    let response = await markAttendance.find({
      $and: [
        {guestId},
        {attendentDate}
      ]
    })
    if (response.length == 0) {      
        let nextDayPresent = new markAttendance({
          guestName,
          guestId,
          inviteNo,
          guestDepartment,
          guestNumber,
          guestCategory,
          attendentDate,
        });
        try {
          let markAttendance = await nextDayPresent.save();
          res.send({ message: "Thankyou for your presence" });
          // console.log("attandance marked");
        } catch (error) {
          res.send({
            message: "Network Issue",
            error,            
          });
          // console.log(error, "error in catch")
        }
      // }
    } else {  
      res.status(400).send({ message: "Record already updated." });
    }
  } else {
    res.status(401).send({ message: "Only Admin can mark attendance" });
  }
};

exports.getPresentGuestList = async (req, res) => {
   console.log("getpresentGuestList")
  try {
      let response = await markAttendance.find()
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
