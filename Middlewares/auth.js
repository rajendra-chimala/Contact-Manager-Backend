const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../Models/user');
const JWT_KEY = process.env.JWT_KEY;

const isAuthenticated = async (req,res,next)=>{

    const token = req.header("Auth");
    // console.log(token);

    try {
        

    if(!token) return res.json({message:"Login first !", success:false});

    const decoded = jwt.verify(token,JWT_KEY);
    const id = decoded.user;

    const user = await User.findById(id);

    req.user = user;

    next()
    } catch (error) {

        console.log("Token not found !")
        res.json({message:"Request fail !",success:false})
        
    }

}

module.exports = {isAuthenticated}