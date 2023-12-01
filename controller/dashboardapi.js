const addInvites = require("../models/invititionForm");
const PresentGuestList = require("../models/attendanceMaster"); // Attendance list list Table

let category = require("../models/category");

exports.getCartsCounts = async(req, res) => {
    let usersCount = await addInvites.count()
    let sentSmsCount =  await addInvites.find({invitationStatus:"Invitation Sent"}).count()
    let pendingSmsCount =  await addInvites.find({invitationStatus:"Not Sent"}).count()
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
    let pendingCount = await addInvites.find({availability:"Not Responded"}).count()
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
    // let guestList =  await addInvites.find({availability:"yes"})
    let guestList = await addInvites.find()
    let navyDayGuestList = await addInvites.find({
        $and: [
          {availability:"yes"},
          {navydayInvitation:"Yes"}
        ]
      })

      let preNavydayGuestList = await addInvites.find({
        $and: [
          {preNavydayAvailability:"yes"},
          {preInvitation:"Yes"}
        ]
      })   


if(req.params.id == 'navyday'){
    guestList = [...navyDayGuestList]
}

if(req.params.id == 'prenavyday'){
    guestList =  [...preNavydayGuestList]
}

    
    
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

exports.getPresentGuest = async(req, res) => {    
    console.log("getPresentGuest hit")
    let guestList = await PresentGuestList.find()    
    let navyDayGuestList = await PresentGuestList.find({
        attendentDate : "12/4/2022"
        // $and: [
        //   {availability:"yes"},
        //   {navydayInvitation:"Yes"}
        // ]
        
      })
      console.log("getPresentGuest hit list", navyDayGuestList)

      let preNavydayGuestList = await PresentGuestList.find({
        attendentDate : "12/3/2022"
        // $and: [
        //   {availability:"yes"},
        //   {preInvitation:"Yes"}
        // ]
      })   


if(req.params.id == 'navyday'){
    guestList = [...navyDayGuestList]
}

if(req.params.id == 'prenavyday'){
    guestList =  [...preNavydayGuestList]
}

    if(guestList) {
        res.send({guestList, message:"Request completed successfully"})

    } else {
        res.send({message:"Something went wrong"})
    }    
}