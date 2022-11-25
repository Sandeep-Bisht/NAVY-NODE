const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    guestName : { type : String, require : true },
    inviteNo : { type : String, require : true, unique:true },
    guestDesignation : { type : String, require :true },
    guestDepartment : { type : String, require : true },
    guestNumber : { type : String, require : true },
    guestOfficeNumber : { type : String },
    guestEmail : { type : String},
    invitationStatus : { type : String},
    reminderStatus : { type : String },
    availability : { type : String },
    stringToken : { type : String},
    guestCategory : { type : String, require :true },

}, {timestamp : true}
)


module.exports = mongoose.model('guestTable', invitationSchema)

