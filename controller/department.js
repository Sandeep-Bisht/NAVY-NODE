let department = require("../models/department");
const addInvites = require("../models/invititionForm");

exports.createDepartment = async (req, res) => {
  let data = new department(req.body)
  let response = await department.find();
  let departmentAllReadyExist = false
  for(let item of response){
    if(item.departmentName == data.departmentName){
        departmentAllReadyExist = true
        break;
    }
  }
  if(departmentAllReadyExist){
    return res.send({errorMessage:"All ready exist"})
  }
    try {
      let saveUser = await data.save();
      res.send({ message: "Department save successfully" });
    } catch (error) {
      res.send({ message: "Error occured while saving Category", error });
    }
};

exports.getDepartments = async(req, res) => {
    try {
        let response = await department.find()
        res.send({response, message:"Request completed successfully"})

    } catch (error) {
        res.send({ message: "Error occured while fetching categories" })
    }
}

exports.updateDepartment = async(req, res) => {
        const { _id, departmentName, departmentDescription } = req.body
        let user = await department.findById(_id)
        user.departmentName = departmentName
        user.departmentDescription = departmentDescription
        try {
            let updateEntry = await user.save()
            res.json({ message: "Category updated successfully" })
        }
        catch (err) {
            res.send(err)
        }
}

  exports.getGuestListByDepartmentId = async(req, res) => {
    try {
        let response = await addInvites.find({guestDepartment:req.params.id})
        res.send(response)
  
    } catch (error) {
        res.send({ message: "Error occured while fetching categories" })
    }
  }


