let category = require("../models/category");

exports.createCategory = async (req, res) => {
  let data = new category(req.body)
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


