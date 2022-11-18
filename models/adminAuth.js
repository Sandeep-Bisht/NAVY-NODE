const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const authSchema = new Schema({
    // userName: { type: String },    
    userEmail : { type: String, require: true, index:true, unique:true, sparse:true},
    password: { type: String, require:true }    
},{timestamps: true} 
)

module.exports = mongoose.model('adminAuth', authSchema)