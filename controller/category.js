let category = require("../models/category");
const addInvites = require("../models/invititionForm");  // GUest list Table

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
    return res.send({errorMessage:"All ready exist"})
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
        res.send({
          response, 
          message:"Request completed successfully"
        })

    } catch (error) {
        res.send({ message: "Error occured while fetching categories" })
    }
}

exports.updateCategory = async(req, res) => {
        const { _id, categoryName, categoryDescription } = req.body
        let user = await category.findById(_id)
        user.categoryName = categoryName
        user.categoryDescription = categoryDescription
        try {
            let updateEntry = await user.save()
            res.json({ message: "Category updated successfully" })
        }
        catch (err) {
            res.send(err)
        }
}


exports.getGuestListByCategoryId = async(req, res) => {
  try {
      let response = await addInvites.find({guestCategory:req.params.id})
      res.send(response)

  } catch (error) {
      res.send({ message: "Error occured while fetching categories" })
  }
}