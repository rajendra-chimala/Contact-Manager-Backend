const Contact = require("../Models/contact");

//create 

const createContact = async (req,res)=>{

    try {
        const {name,email,phone,type} = req.body

    if(name =="" || email == "" || phone=="" ||type=="") return res.json({message:"All field are required !",success:false});
  

        const newContact = await Contact({
            name,email,phone,type,user:req.user
        });

        newContact.save();

        return res.json({message:"Contact is created Successfully !", success:true,newContact});


        
    } catch (error) {
        console.log("Error in contact creation ! ", error);
        res.json({message:"Error is creating the contact !",success: false});
        
    }
}


const getAll = async (req,res)=>{
    try {
        const contacts = await Contact.find();
    if(!contacts) return res.json({message:"Users Not Found !"});

    res.json({message:"User Get Successfully !",success:true,contacts})
    } catch (error) {
        console.log("Error in getting all contact !");
        res.json({message:"Error is getting users !",success:false});
        
    }

}


const getByID = async (req,res)=>{
    const id = req.params.id;

    const isUser = await Contact.findById(id);

    if(!isUser) return res.json({message:"Contact not found !",success:false});

    res.json({message:"User is Here : ",success:true,isUser});

    
}


const updateContact = async (req,res)=>{
try {
    
    const id = req.params.id
    const {name,email,phone,type} = req.body;

    const isValidContact = await Contact.findById(id)

    if(!isValidContact) return res.json({message:"Contact is not found !"});

    const newContact = await Contact.findByIdAndUpdate(id,{name,email,phone,type},{new:true});
    res.json({message:"Contact is updated successfully !",success:true,newContact});
} catch (error) {

    console.log("Error is Updating the Contact !", error);
    res.json({message:"Error in update Contact !",success:false,error});

    
}

}


const deleteContact = async (req,res)=>{

    try {

        const id = req.params.id
        const isUser = await Contact.findById(id);

        if(!isUser) return res.json({message:"Contact not found !",success:false})

            await Contact.findByIdAndDelete(id);
            res.json({message:"User Deleted Successfully ! ",success:true,isUser});
        
    } catch (error) {

        console.log("Error is Deleting the Contact !",error)
        res.json({message:"User Delete failed !",success:false,error});
        
    }

}



const getContactByUserID = async (req,res)=>{
const id = req.params.id;



    try {

        const userContact = await Contact.find({user:id});
        if(!userContact) return res.json({message:"No contact Found !",success:false});


        res.json({message:"Contact Fetched",userContact,success:true})
        
    } catch (error) {
        console.log(error);
        res.json({message:"Failed to Fetch !",success:false,error});
        
    }
}



module.exports = {createContact,getAll,getByID,updateContact,deleteContact,getContactByUserID}