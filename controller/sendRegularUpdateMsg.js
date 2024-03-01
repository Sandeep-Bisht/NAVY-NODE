
const addInvites = require("../models/invititionForm");
const http = require("https");


exports.sendRegularUpdateMsg = async (req, res) => {
    let { guestName, guestDesignation, guestNumber, _id, } = req.body;  
    try {
        let smsSend = async (status) => {
            let response = JSON.parse(status);
            let user = await addInvites.findOne({ _id });
            if (response.type == "success") {
            //   user.invitationStatus = "Invitation Sent";
            //   user.diwaliInvitation = "Yes";
            //   let updateEntry = await user.save();
            res.send({ message: status });
            }
           
          };
        
        
          if (guestName) {
            let payload = {
              flow_id: "65bca22f6530296cac2b49b6",
              sender: "NHODDN",
              recipients: [
                {
                  mobiles: `91${guestNumber}`,

                },
              ],
            };
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
                    console.log("check response",msgResponse )
                    smsSend(msgResponse);
                  }
                });
              });
              req.write(JSON.stringify(payload));
              req.end();
            
          }
    } catch (error) {
        res.send({ message: "Somthing went wrong" });
    }
    
  };