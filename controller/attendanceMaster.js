const markAttendance = require("../models/attendanceMaster"); // Attendance list list Table


exports.markAttendance = async (req, res) => {  
  let uniqueKey = "12345";
  let {
    guestName,
    inviteNo,
    guestDesignation,
    guestDepartment,
    guestNumber,
    guestCategory,
    attendentDate,
    adminPassword,
  } = req.body;

  if (uniqueKey == adminPassword) {
    let response = await markAttendance.find({inviteNo}).count();
    if (response != 0) {
      res.send({ message: "Attendance marked already" });
    } else {
      let presentGuest = new markAttendance({
        guestName,
        inviteNo,
        guestDesignation,
        guestDepartment,
        guestNumber,
        guestCategory,
        attendentDate,
      });
      try {
        let markAttendance = await presentGuest.save();
        res.send({ message: "Guest attendance marked successfully" });
        console.log("attandance marked");
      } catch (error) {
        res.send({
          message: "Somthing went wrong while marking attendance",
          error,
        });
      }
    }
  } else {
    res.send({ message: "You can't mark guest attendance" });
  }
};
