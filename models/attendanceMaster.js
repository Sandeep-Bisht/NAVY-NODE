const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const attendanceMasterSchema = new Schema({
    guestName : { type : String, require : true },
    inviteNo : { type : String, require : true, unique : true },
    guestDesignation : { type : String, require :true },    
    guestNumber : { type : String, require : true }, 
    guestCategory : { type : String, require :true },
    guestDepartment : { type : String, require :true },
    attendentDate : { type : Array, require : true }

}, {timestamp : true}
)


module.exports = mongoose.model('attendanceMaster', attendanceMasterSchema)