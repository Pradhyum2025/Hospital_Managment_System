import express from'express'
import { User } from '../models/user.js';
import { isAuth } from '../middleware/auth.js';


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

export const updateProfile = async (req, res) => {
  const { firstName,lastName,age,dateOfBirth,gender,phoneNumber,email } = req.body;
  try {
    const userId=  req.user.id;
    if(!firstName || !lastName || !age || !dateOfBirth || !gender || !phoneNumber || !email){
      return res.status(400).json({ 
        success: false,
         message:'Profile updatation sucessful'
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: {firstName,lastName,
        profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        age,dateOfBirth,gender,phoneNumber,email} },
      { new: true, runValidators: true }
    );
    res.status(200).json({ 
      success: true,
      updatedUser ,
       message:'Profile updatation sucessful'
      });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message:'Internal server error'
     });
    console.log("Error updating profile:", error.message);
  }
}

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

