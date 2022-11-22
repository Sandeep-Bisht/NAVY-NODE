//let registration = require("../models/registration");
let sendInvitation = require("../models/sendInvitation");
const http = require("https");

exports.sendInvitation = async (req, res) => {
  let { guestName, guestDesignation, guestNumber, guestEmail } = req.body;
  // console.log("send Invitation hit");
  if (guestName) {
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
        '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": [\n    {\n      "mobiles": "91' +
          guestNumber +
          '",\n      "depth": "' +
          guestName +
          '",\n      "difference": "' +
          guestDesignation +
          '"\n    }\n  ]\n}'
      );
      req.end();

      // let sendInvitation = await guestList.save();
      //  res.send({ message: "Guest details saved successfully" });
      res.send({ message: "Invitation sent successfully" });
    } catch (error) {
      res.send({ message: "Somthing went wrong" });
    }
  }
};

exports.sendInvitationToAll = async (req, res) => {
  let guestList  = [];
  guestList = req.body;
  if (guestList) {
    const recipients = [];
   for (const item of guestList) {
      recipients.push({
        mobiles:`91${item.guestNumber}`,
          depth:item.guestName,
          difference:item.guestDesignation,
        })
   }


   console.log("final arr",recipients);
      
  
    
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
    '{\n  "flow_id": "61e14ff4571553440b2916e1",\n  "sender": "GIKSN",\n  "recipients": '+JSON.stringify(recipients)+'\n}'
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
