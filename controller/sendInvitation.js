var jwt = require("jsonwebtoken");
// let sendInvitation = require("../models/sendInvitation");
const addInvites = require("../models/invititionForm");
const http = require("https");

// function generateAccessToken(userId) {
//   return jwt.sign({ userId }, "6210607b75c134501baa290c", { expiresIn: '1800s' });
// }
const genRandString = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

exports.sendInvitation = async (req, res) => {
  let { guestName, guestDesignation, guestNumber, _id } = req.body;
  console.log("send Invitation hit", _id);
  if (guestName) {
    let generatedString = genRandString(10);
     let url = `http://inho.in/navyday/${generatedString} `
    //let url = `http://localhost:3000/navyday/${generatedString} `;
    try {
      const options = {
        method: "POST",
        hostname: "api.msg91.com",
        port: null,
        path: "/api/v5/flow/",
        headers: {
          authkey: "223758APRHg1EMKR5b39f7a8",
          "content-type": "application/json",
        },
      };

      const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString(), "this is respopnse");
        });
      });

      req.write(
        '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": [\n    {\n      "mobiles": "91' +
          guestNumber +
          '",\n      "depth": "' +
          guestName +
          '",\n      "difference": "' +
          url +
          '"\n    }\n  ]\n}'
      );
      req.end();
      let user = await addInvites.findOne({ _id });
      if (user) {
        user.invitationStatus = "Invitation Sent";
        user.stringToken = generatedString;
        let updateEntry = await user.save();
      }
      res.send({ message: "Invitation card sent successfully" });
    } catch (error) {
      res.send({ message: "Somthing went wrong" });
    }
  }
};

exports.sendReminder = async (req, res) => {
  console.log("send reminder hit");
  let { guestName, guestNumber, _id } = req.body;
  let user = await addInvites.findOne({ _id });
  if (user) {
    console.log(user, "userrrrr");
    let token = user.stringToken;
    let url = `http://inho.in/confirmation/${token} `;
    //let url = `http://localhost:3000/confirmation/${token} `;
    try {
      const options = {
        method: "POST",
        hostname: "api.msg91.com",
        port: null,
        path: "/api/v5/flow/",
        headers: {
          authkey: "223758APRHg1EMKR5b39f7a8",
          "content-type": "application/json",
        },
      };

      const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString(), "this is respopnse");
        });
      });

      req.write(
        '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": [\n    {\n      "mobiles": "91' +
          guestNumber +
          '",\n      "depth": "' +
          guestName +
          '",\n      "difference": "' +
          url +
          '"\n    }\n  ]\n}'
      );
      req.end();
      let user = await addInvites.findOne({ _id });
      if (user) {
        user.reminderStatus = "Reminder Sent";
        let updateGuestDetails = await user.save();
      }
      res.send({ message: "Reminder sent successfully" });
    } catch (error) {
      res.send({ message: "Somthing went wrong in sending reminder" });
    }
  }
};

exports.sendInvitationToAll = async (req, res) => {
  let guestList = [];
  guestList = req.body;
  if (guestList) {
    const recipients = [];
    for (const item of guestList) {
      recipients.push({
        mobiles: `91${item.guestNumber}`,
        depth: item.guestName,
        difference: item.guestDesignation,
      });
    }

    //  console.log("final arr",recipients);
    try {
      const options = {
        method: "POST",
        hostname: "api.msg91.com",
        port: null,
        path: "/api/v5/flow/",
        headers: {
          authkey: "223758APRHg1EMKR5b39f7a8",
          "content-type": "application/json",
        },
      };

      const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });

      req.write(
        '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": ' +
          JSON.stringify(recipients) +
          "\n}"
      );
      req.end();
      res.send({ message: "Invitation sent successfully" });
    } catch (error) {
      res.send({ message: "Somthing went wrong" });
    }
  }
};

// =============
// =============

// req.write(
//     '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": '+JSON.stringify(recipients)+'\n}'
//   );

// const recipients = [{
//     "mobiles":"919639156497",
//     "depth":"Sandeep Bisht",
//     "difference":"testing ",
//   },
//   {
//     "mobiles":"917668992606",
//     "depth":"Shubham Semwal",
//     "difference":"testing 2",
//   },]

// ============

// ============
