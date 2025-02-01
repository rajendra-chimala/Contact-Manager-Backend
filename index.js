const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DB_URL =process.env.DB_URL;

const app = express();

//DataBase Connection 



(async()=>{
    await mongoose.connect(DB_URL).then(()=>{console.log("mongoDB is Connected !")}).catch(()=>{
        console.log("Error in Database Connection !")})
    
})();

app.use(express.json());
app.use("/api",require('./Router/userRouter.js'));
app.get('/',(req,res)=>{
    res.end("Hello")
})
app.use("/api/contact/",require('./Router/contactRoute'));



app.listen(PORT, ()=>{
    console.log("Server is Running !");
})