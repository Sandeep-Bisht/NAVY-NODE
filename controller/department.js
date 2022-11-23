let department = require("../models/department.js");
exports.createDepartment = async (req, res) => {
    let data = new department(req.body)
    try {
    let saveDepartment = await data.save();
    res.send({ message: "Department save successfully" });
    } catch (error) {
    res.send({ message: "Error occured while saving department", error });
    }
  };