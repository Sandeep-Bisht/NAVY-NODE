const addInvites = require("../models/invititionForm");
let category = require("../models/category");

exports.getCartsCounts = async(req, res) => {
    let usersCount = await addInvites.count()
    let sentSmsCount =  await addInvites.find({invitationStatus:"Invitation Sent"}).count()
    let pendingSmsCount =  await addInvites.find({invitationStatus:"null"}).count()
    let failedSmsCount = await addInvites.find({invitationStatus:"failed"}).count()

    let responseObj = {
        usersCount,
        sentSmsCount,
        pendingSmsCount,
        failedSmsCount
    }
    res.send({responseObj, message:"Request completed successfully"})
}

exports.getCategoryUserCount = async(req, res) => {
    let categories = await category.find()
    let allUser = await addInvites.find();

    let categoryData = []

    if(categories.length > 0){
        categories.map((item,index)=>{
            let data = {};
            data.categoryName = item.categoryName;
            data.userCount = allUser.filter((user) => user.guestCategory == item._id).length;
            categoryData[index] = data;
        })
    }

    res.send({categoryData, message:"Request completed successfully"})
}

exports.getConfirmationCount = async(req, res) => {
    let pendingCount = await addInvites.find({availability:"null"}).count()
    let regretCount =  await addInvites.find({availability:"no"}).count()
    let confirmCount =  await addInvites.find({availability:"yes"}).count()

    let response = [{
        type: "pending",
        counter: parseInt(pendingCount),
    },
    {
        type: "confirm",
        counter: parseInt(confirmCount),

    },
    {
        type: "regret",
        counter: parseInt(regretCount),

    }
    ]


    res.send({response, message:"Request completed successfully"})
}

exports.getConfirmationGuest = async(req, res) => {
    // let pendingCount = await addInvites.find({availability:"null"})
    // let regretCount =  await addInvites.find({availability:"no"})
    let guestList =  await addInvites.find({availability:"yes"})

    // let response = [{
    //     type: "pending",
    //     counter: parseInt(pendingCount),
    // },
    // {
    //     type: "confirm",
    //     counter: parseInt(confirmCount),

    // },
    // {
    //     type: "regret",
    //     counter: parseInt(regretCount),

    // }
    // ]
    if(guestList) {
        res.send({guestList, message:"Request completed successfully"})

    } else {
        res.send({message:"Something went wrong"})
    }    
}