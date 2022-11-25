var jwt = require("jsonwebtoken");
const addInvites = require("../models/invititionForm");
const http = require("https");
const genRandString = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

exports.sendPreInvitation = async (req, res) => {
  let { guestName, guestNumber, _id } = req.body;
  console.log("send pre Invitation hit", _id);
  if (guestName) {
    let generatedString = genRandString(10);
    let smsSend = async (status) => {
      console.log("inside smsSend", status)
      let response = JSON.parse(status)
      let user = await addInvites.findOne({ _id });
      if (response.type == "success") {
        user.invitationStatus = "Invitation Sent";
        user.stringToken = generatedString;
        let updateEntry = await user.save();
      }
      res.send({ message: status });
    };
    let url = `prenavyday/${generatedString}`;
    let payload = {
      flow_id: "638052d56fe9b523b82cc816",
      sender: "GIKSIN",
      recipients: [
        {
          mobiles: `91${guestNumber}`,
          link: url,
        },
      ],
    };
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
          let msgResponse = body.toString();
          if (msgResponse) {
            smsSend(msgResponse);
          }
        });
      });

      req.write(JSON.stringify(payload));
      req.end();      
    } catch (error) {
      res.send({ message: "Somthing went wrong in sending pre invitation card" });
    }
  }
};

exports.sendInvitation = async (req, res) => {
  let { guestName, guestDesignation, guestNumber, _id } = req.body;
  let generatedString = genRandString(10);
  let smsSend = async (status) => {
    let response = JSON.parse(status)
    let user = await addInvites.findOne({ _id });
    if (response.type == "success") {
      user.invitationStatus = "Invitation Sent";
      user.stringToken = generatedString;
      let updateEntry = await user.save();
    }
    res.send({ message: status });
  };

  if (guestName) {
    let url = `navyday/${generatedString}`;
    let payload = {
      flow_id: "638053361eb4a02e03621287",
      sender: "GIKSIN",
      recipients: [
        {
          mobiles: `91${guestNumber}`,
          link: url,
        },
      ],
    };
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
          let msgResponse = body.toString();
          if (msgResponse) {
            smsSend(msgResponse);
          }
        });
      });
      req.write(JSON.stringify(payload));
      req.end();
      
    } catch (error) {
      res.send({ message: "Somthing went wrong" });
    }
  }
};

exports.sendReminder = async (req, res) => {
  let { guestNumber, _id } = req.body;
  let user = await addInvites.findOne({ _id });
  if (user) {
    let token = user.stringToken;
    let url = `confirmation/${token}`;
    
    let payload = {
      flow_id: "63805390fdcaca31bb765364",
      sender: "GIKSIN",
      recipients: [
        {
          "mobiles": `91${guestNumber}`,
          "link": url,
        },
      ],
    };


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

      req.write(JSON.stringify(payload));
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
