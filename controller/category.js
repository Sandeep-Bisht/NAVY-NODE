let category = require("../models/category");

exports.createCategory = async (req, res) => {
  let data = new category(req.body)
  let response = await category.find();
  let categoryAllReadyExist = false
  for(let item of response){
    if(item.categoryName == data.categoryName){
        categoryAllReadyExist = true
        break;
    }
  }
  if(categoryAllReadyExist){
    return res.send({message:"All ready exist"})
  }
    try {
      let saveUser = await data.save();
      res.send({ message: "Category save successfully" });
    } catch (error) {
      res.send({ message: "Error occured while saving Category", error });
    }
};

exports.getCategories = async(req, res) => {
    try {
        let response = await category.find()
        res.send({response, message:"Request completed successfully"})

    } catch (error) {
        res.send({ message: "Error occured while fetching categories" })
    }
}


