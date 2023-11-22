var jwt = require("jsonwebtoken");
const addInvites = require("../models/invititionForm");
const http = require("https");
const genRandString = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

exports.sendPreInvitation = async (req, res) => {
  let { guestName, guestNumber, _id, stringToken } = req.body;
  let user = await addInvites.findOne({ _id });
  if (user.stringToken && user.stringToken == stringToken) {
    var generatedString = user.stringToken;
  } else {
    var generatedString = genRandString(10);
  }

  let smsSend = async (status) => {
    let response = JSON.parse(status);
    let user = await addInvites.findOne({ _id });
    if (response.type == "success") {
      user.invitationStatus = "Invitation Sent";
      user.preInvitation = "Yes"
      user.stringToken = generatedString;
      let updateEntry = await user.save();
    }
    res.send({ message: status });
  };
  let url = `prenavyday/${generatedString}`;
  //let url = `http://localhost:3000/prenavyday/${generatedString} `;

  let payload = {
    flow_id: "655c5869491a537323022568",
    sender: "NHODDN",
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
};

exports.sendInvitation = async (req, res) => {
  let { guestName, guestDesignation, guestNumber, _id, stringToken} = req.body;
  let user = await addInvites.findOne({ _id });
  if (user.stringToken && user.stringToken == stringToken) {
    var generatedString = user.stringToken;
  } else {
    var generatedString = genRandString(10);
  }
  let smsSend = async (status) => {
    let response = JSON.parse(status);
    let user = await addInvites.findOne({ _id });
    if (response.type == "success") {
      user.invitationStatus = "Invitation Sent";
      user.navydayInvitation = "Yes";
      user.stringToken = generatedString;
      let updateEntry = await user.save();
    }
    res.send({ message: status });
  };

  if (guestName) {
    let url = `navyday/${generatedString}`;
    let payload = {
      flow_id: "655c5897261de1502e2059f3",
      sender: "NHODDN",
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

exports.sendFestivalWishes = async (req, res) => {
  let { guestName, guestDesignation, guestNumber, _id, stringToken} = req.body;
  let user = await addInvites.findOne({ _id });

  let smsSend = async (status) => {
    let response = JSON.parse(status);
    let user = await addInvites.findOne({ _id });
    if (response.type == "success") {
      user.invitationStatus = "Invitation Sent";
      user.diwaliInvitation = "Yes";
      let updateEntry = await user.save();
    }
    res.send({ message: status });
  };


  if (guestName) {
    // let url = `navyday/${generatedString}`;
    let payload = {
      flow_id: "654dc559e59c1a4d237a2222",
      sender: "NHODDN",
      recipients: [
        {
          mobiles: `91${guestNumber}`,
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
      res.send({ message: "Somthing went wrong" });
    }
  }
};

exports.sendReminder = async (req, res) => {
  let { guestNumber, _id } = req.body;
  let user = await addInvites.findOne({ _id });
  let smsSend = async (status) => {
    let response = JSON.parse(status);
    let user = await addInvites.findOne({ _id });
    if (response.type == "success") {
      user.reminderStatus = "Reminder Sent";
      let updateEntry = await user.save();
      res.send({ message: status });
    } else {
      res.send({ message: status });
    }
  };
  if (user) {
    let token = user.stringToken;
    let url = `confirmation/${token}`;

    let payload = {
      flow_id: "655c57eb261de1502e2059f2",
      sender: "NHODDN",
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
