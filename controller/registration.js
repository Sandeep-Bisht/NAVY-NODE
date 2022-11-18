let registration = require("../models/registration");

exports.userRregistration = async (req, res) => {
  //let userData = new registration(req.body)
  let { userName, userEmail, password } = req.body;
//   console.log("registration hit");
  if (userName && userEmail && password) {
    // console.log("reistration api", userName, userEmail, password);
    let registerUser = new registration({
      userName,
      userEmail,
      password,
    });
    try {
      let saveUser = await registerUser.save();
      res.send({ message: "registration save successfully" });
    } catch (error) {
      res.send({ message: "Error occured while registration", error });
    }
  }
};
