const express = require("express");
var router = express.Router();

const { getUsers } = require("../controller/adminAuth.js");
const { userRregistration } = require("../controller/registration.js")
const { addGuestList } = require("../controller/addInvites");
const { getGuestList } = require("../controller/addInvites");
const { sendInvitation } = require("../controller/sendInvitation.js");
const { sendInvitationToAll } = require("../controller/sendInvitation.js");
const { markAvailability, verifyGuestByToken } = require("../controller/availability.js");
const { createCategory, getCategories, updateCategory } = require('../controller/category.js');
const { getCartsCounts , getCategoryUserCount , getConfirmationCount } = require('../controller/dashboardapi.js')
// //const { handle404Route } = require('../controller/404')


router.post("/getuser", getUsers);
router.post("/userRregistration", userRregistration);
router.post("/markAvailability", markAvailability);
router.get("/verifyGuestByToken", verifyGuestByToken)
router.post("/addGuestList", addGuestList);
router.get("/getGuestList", getGuestList);
router.post("/sendInvitation", sendInvitation);
router.post("/sendInvitationToAll", sendInvitationToAll);
router.post("/createcategory", createCategory);
router.get('/getcategories', getCategories);
// Dashboard Apis
router.get('/getCartsCounts', getCartsCounts);
router.get('/getCategoryUserCount', getCategoryUserCount);
router.get('/getConfirmationCount', getConfirmationCount);
// Dashboard APi End
router.patch('/updatecategory', updateCategory)
// //router.get('/*', handle404Route )

module.exports = router;
