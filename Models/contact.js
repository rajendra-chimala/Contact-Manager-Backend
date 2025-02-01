const mongoose = require("mongoose")


const contactSchema = new mongoose.Schema({

 name:{type:String,required:true},   
 email:{type:String,required:true},   
 phone:{type:String,required:true},   
 type:{type:String,required:true},   
 createdAt:{type:Date,default:Date.now},
 user:{type:mongoose.Schema.Types.ObjectId}   


})
const Contact = mongoose.model("Contact",contactSchema)

module.exports = Contact