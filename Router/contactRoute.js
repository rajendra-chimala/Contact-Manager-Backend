const express  = require('express');
const {createContact,getAll,getByID,updateContact,deleteContact,getContactByUserID} = require('../Controllers/contactController');
const Contact = require("../Models/contact")
const router = express.Router();
const {isAuthenticated} = require("../Middlewares/auth")


router.get("/all",isAuthenticated,getAll);
router.post("/create",isAuthenticated,createContact)

router.get("/:id",isAuthenticated,getByID);
router.put("/update/:id",isAuthenticated,updateContact)
router.delete("/delete/:id",isAuthenticated,deleteContact)
router.get("/user/:id", getContactByUserID);




module.exports = router