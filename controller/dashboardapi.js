const addInvites = require("../models/invititionForm");
let category = require("../models/category");

exports.getAllDashboardCounts = async(req, res) => {
    let users = await addInvites.count()
    let civilianCount =  await addInvites.find({categoryName:"Civilian officers"}).count()
    let navyOfficerCount =  await addInvites.find({categoryName:"Navy officers"}).count()
    let responseObj = {
        usersCount:users,
        civilianCount,
        navyOfficerCount
    }
    res.send({responseObj, message:"Request completed successfully"})
}