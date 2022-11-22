const express = require("express");
var router = express.Router();

const { getUsers } = require("../controller/adminAuth.js");
const { userRregistration } = require("../controller/registration.js")
const { addGuestList } = require("../controller/addInvites");
const { getGuestList } = require("../controller/addInvites");
const { sendInvitation } = require("../controller/sendInvitation.js");
const { sendInvitationToAll } = require("../controller/sendInvitation.js");
const { createCategory, getCategories } = require('../controller/category.js')
// //const { handle404Route } = require('../controller/404')


router.get("/getuser", getUsers);
router.post("/userRregistration", userRregistration);
router.post("/addGuestList", addGuestList);
router.get("/getGuestList", getGuestList);
router.post("/sendInvitation", sendInvitation);
router.post("/sendInvitationToAll", sendInvitationToAll);
router.post("/createcategory", createCategory);
router.get('/getcategories', getCategories);
// //router.get('/*', handle404Route )

module.exports = router;
