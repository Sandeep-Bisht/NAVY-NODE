var jwt = require("jsonwebtoken");
let registration = require("../models/registration");

function generateAccessToken(user) {
  return jwt.sign({ user }, "6210607b75c134501baa290c", { expiresIn: "1800s" });
}

exports.getUsers = async (req, res) => {
  let { userEmail, password } = req.body;
  if (userEmail == "" && userPassword == "") {
    return res.send({ message: "Please fill the fields" });
  }
  let user = await registration.findOne({ userEmail });

  try {
    if (user) {
      // if(user.userEmail.trim().toLowerCase() == userEmail.trim().toLowerCase() &&
      // user.password.trim().toLowerCase() == password.trim().toLowerCase()) {
      if (user.userEmail == userEmail && user.userPassword == password) {
        console.log(user, "search reasult inside ");
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
    }
  } catch (error) {
    res.send({ message: "No such user found" });
  }
};
