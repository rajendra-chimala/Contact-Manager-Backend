const User = require("../Models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config()

const JWT_KEY = process.env.JWT_KEY; 
const userRegister = async (req,res)=>{
try {
    
    const {name,email,password} = req.body;

    // console.log(name,email,password);

    if(name === "" || email === "" || password === "") return res.status(400).json({message:"All field is required !"});

    const isUser = await User.findOne({email});
    if(isUser)  return res.status(400).json({message:"User Already Exist !"});

    const encryptPassword = await bcrypt.hashSync(password);

    const newUser = new User({name,email,password:encryptPassword});
    newUser.save();
    res.status(200).json({message:"User Created Successfully !",newUser});
    
} catch (error) {

    console.log("Error in User Register : ",error);
    res.status(200).json({message:"User is already Exist !"});
    
}



}


const userLogin = async(req,res)=>{
    const {email,password} = req.body;
    

    try {

        if(email === "" || password === "") return res.status(400).json({message:"All field is required !",success:false});

        const isUser = await User.findOne({email});

        if(!isUser) return res.status(400).json({message:"Invalid email or password !",success:false});


        const isPasswordMatch = bcrypt.compareSync(password,isUser.password);

        if(!isPasswordMatch)return res.status(400).json({message:"Invalid email or password !",success:false});
        const token = jwt.sign({user:isUser._id},JWT_KEY,{expiresIn: '1h'})

        res.cookie('token',token,{maxAge:3600000})
        return res.status(200).json({message:"User Login Successfully !",token,success:true});


    } catch (error) {

        console.log("Error is Login : ", error);
        res.status(400).json({message:"Login error !",success:false})
        
    }
}



module.exports = {userRegister,userLogin}