const markAttendance = require("../models/attendanceMaster"); // Attendance list list Table

exports.markAttendance = async (req, res) => {
  let uniqueKey = "12345";
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
          res.send({ message: "Guest attendance marked successfully" });
          // console.log("attandance marked");
        } catch (error) {
          res.send({
            message: "gone Somthing went wrong while marking attendance",
            error,            
          });
          // console.log(error, "error in catch")
        }
      // }
    } else {  
      res.send({ message: "Attendance marked already" });
    }
  } else {
    res.send({ message: "You can't mark guest attendance" });
  }
};
