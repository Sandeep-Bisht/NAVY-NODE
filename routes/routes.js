const express = require("express");
var router = express.Router();

const { getUsers } = require("../controller/adminAuth.js");
const { userRregistration } = require("../controller/registration.js")
const { addGuestList } = require("../controller/addInvites");
const { getGuestList } = require("../controller/addInvites");
const { sendInvitation, sendReminder, sendPreInvitation } = require("../controller/sendInvitation.js");
const { sendInvitationToAll } = require("../controller/sendInvitation.js");
const { markAvailability, verifyGuestByToken } = require("../controller/availability.js");
const { createCategory, getCategories, updateCategory, getGuestListByCategoryId } = require('../controller/category.js');
const { getCartsCounts , getCategoryUserCount , getConfirmationCount, getConfirmationGuest } = require('../controller/dashboardapi.js')
const { createDepartment , getDepartments , updateDepartment } = require('../controller/department.js')
const { updateGuest , deleteGuest } = require('../controller/guest.js')
const { markAttendance } = require("../controller/attendanceMaster.js");
// //const { handle404Route } = require('../controller/404')


router.post("/getuser", getUsers);
router.post("/userRregistration", userRregistration);
router.post("/markAvailability", markAvailability);
router.get("/verifyGuestByToken", verifyGuestByToken)
router.post("/addGuestList", addGuestList);
router.get("/getGuestList", getGuestList);
router.post("/sendInvitation", sendInvitation);
router.post("/markAttendance", markAttendance);
router.post("/saveDepartment", createDepartment);
router.post("/sendInvitationToAll", sendInvitationToAll);
router.post("/sendPreInvitation", sendPreInvitation);
// Category api
router.post("/sendReminder", sendReminder);
router.post("/createcategory", createCategory);
router.get('/getcategories', getCategories);
router.patch('/updatecategory', updateCategory)
router.get('/getcategoryWiseGuestList/:id', getGuestListByCategoryId);
// Dashboard Apis
router.get('/getCartsCounts', getCartsCounts);
router.get('/getCategoryUserCount', getCategoryUserCount);
router.get('/getConfirmationCount', getConfirmationCount);
router.get('/getConfirmationGuest/:id', getConfirmationGuest);

// Dashboard APi End

// Department APi
router.post("/createDepartment", createDepartment);
router.get('/getDepartments', getDepartments);
router.patch('/updateDepartment', updateDepartment)
// End Department Api

// Guest Update APi
router.post("/updateGuest", updateGuest);
router.post('/deleteGuest', deleteGuest);
// End Api

// //router.get('/*', handle404Route )

module.exports = router;
