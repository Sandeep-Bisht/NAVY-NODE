const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categorySchema = new Schema({   
    categoryName : { type: String, require: true, index:true, unique:true, sparse:true}, 
    categoryDescription : { type: String, require: false, index:true, unique:false, sparse:true},   
},{timestamps: true} 
)

module.exports = mongoose.model('categorySchema', categorySchema)