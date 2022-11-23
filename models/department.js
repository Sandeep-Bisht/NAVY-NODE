const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const departmentSchema = new Schema({   
    departmentName : { type: String, require: true, index:true, unique:true, sparse:true}, 
    departmentDescription : { type: String, require: false, index:true, unique:false, sparse:true},   
},{timestamps: true} 
)

module.exports = mongoose.model('departmentSchema', departmentSchema)