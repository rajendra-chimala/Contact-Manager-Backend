const express = require("express");
const User = require("../Models/user")

const router = express.Router();
const {userRegister,userLogin} = require("../Controllers/userController");


router.post("/signup/",userRegister)
router.post("/login",userLogin)
router.get("/all",async (req,res)=>{
    const users = await User.find()
    console.log(users)
    res.json(users);
})

module.exports = router