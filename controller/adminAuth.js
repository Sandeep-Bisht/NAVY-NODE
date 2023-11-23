var jwt = require("jsonwebtoken");
let registration = require("../models/registration");

function generateAccessToken(user) {
  return jwt.sign({ user }, "6210607b75c134501baa290c", { expiresIn: "1800s" });
}

exports.getUsers = async (req, res) => {
  let { useremail, password } = req.body;
  if (!useremail  || !password ) {
    return res.send({ message: "Please fill the fields" });
  }
  let user = await registration.findOne({ useremail });
  try {
    if (user) {
      // if(user.userEmail.trim().toLowerCase() == userEmail.trim().toLowerCase() &&
      // user.password.trim().toLowerCase() == password.trim().toLowerCase()) {
      if (user.userEmail == useremail && user.password == password) {
        let token = generateAccessToken({ user });
        res.send({ token, message: "Logged in successfully" });
      } else {
        res
          .status(401)
          .send({
            token: "",
            message: "Please enter valid email and Password",
          });
      }
    }else{
      res.send({ message: "No such user found" });
    }
  } catch (error) {
    res.send({ message: "No such user found" });
  }
};
