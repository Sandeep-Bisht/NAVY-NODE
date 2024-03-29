const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const attendanceMasterSchema = new Schema({
    guestName : { type : String, require : true },
    guestId : { type : String, require : true },
    inviteNo : { type : String, require : true },
    guestDesignation : { type : String, require :true },    
    guestNumber : { type : String, require : true }, 
    guestCategory : { type : String, require :true },
    guestDepartment : { type : String, require :true },
    attendentDate : { type : String, require : true }

}, {timestamp : true}
)


module.exports = mongoose.model('attendanceMaster', attendanceMasterSchema)