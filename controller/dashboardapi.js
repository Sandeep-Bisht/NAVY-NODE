const addInvites = require("../models/invititionForm");
let category = require("../models/category");

exports.getAllDashboardCounts = async(req, res) => {
    let usersCount = await addInvites.count()
    let sentSmsCount =  await addInvites.find({invitationStatus:"Invitation Sent"})
    let pendingSmsCount =  await addInvites.find({invitationStatus:"null"})
    let failedSmsCount = await addInvites.find({invitationStatus:"failed"})

    let responseObj = {
        usersCount,
        sentSmsCount,
        pendingSmsCount,
        failedSmsCount
    }
    res.send({responseObj, message:"Request completed successfully"})
}
