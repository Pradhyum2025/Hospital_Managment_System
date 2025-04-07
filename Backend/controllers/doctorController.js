import express from'express'
import { User } from '../models/user.js';


// router.post("/add-contact-us", async (req, res) => {
//   const { name, phone, email, message } = req.body;

//   try {
//     const newContactUs = new ContactUs({
//       name,
//       phone,
//       email,
//       message,
//     });

//     const savedContactUs = await newContactUs.save();

//     res.status(200).json(savedContactUs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/get-users" , async (req ,res) =>{

//   try {
//     const findUser =  await User.find();
//     if(!findUser) res.json("No user found");
//     res
//     .status(200)
//     .json(findUser);
//   } catch (error) {
    
//   }

// } );


//get listing data 
export const getAllDoctors = async(req,res)=>{
  
  try{
    const allDoctors = await User.find({role:'doctor'});

    return res.status(200).json({
      success:true,
      message:'fetch All Doctor Successfully!',
      allDoctors
    })
  }catch(error){
    console.log("fetch All Doctor", error.message)
    return res.status(500).json({
      success:false,
      message:'Internal Server Error!'
    })
  }
}

