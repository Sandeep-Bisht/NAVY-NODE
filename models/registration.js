const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const registrationSchema = new Schema({
    userName : { type : String, require:true },
    userEmail : { type: String, require: true},
    password: { type: String, require:true }
},{timestamps: true} 
)

module.exports = mongoose.model('registration', registrationSchema)