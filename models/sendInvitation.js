const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sendInvitationSchema = new Schema({
    guestName : { type : String, require : true },
    guestDesignation : { type : String, require :true },
    guestDepartment : { type : String, require : true },
    guestNumber : { type : String, require : true },
    guestOfficeNumber : { type : String, require : true },
    guestEmail : { type : String, require : true },
    guestAddress : { type : String, require : true }

}, {timestamp : true}
)


module.exports = mongoose.model('InvitationList', sendInvitationSchema)