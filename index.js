const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DB_URL =process.env.DB_URL;
const cors = require('cors');

const app = express();

//DataBase Connection 



(async()=>{
    await mongoose.connect('mongodb+srv://contactManager:contactManager@contactmanager.dynyi.mongodb.net/?retryWrites=true&w=majority&appName=contactManager').then(()=>{console.log("mongoDB is Connected !")}).catch(()=>{
        console.log("Error in Database Connection !")})
    
})();

app.use(express.json());
app.use("/api",require('./Router/userRouter.js'));
app.get('/',(req,res)=>{
    res.end(`<h1 style="color:white;text-align:center; margin-top:40%; background:green; font-width:500;">This is Day 1 Project of #7Day #7BackendChallenge.<h1>`)
})
app.use("/api/contact/",require('./Router/contactRoute'));



app.listen(PORT, ()=>{
    console.log("Server is Running !");
})
