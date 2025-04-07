import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
//load env files
dotenv.config();

// check seller authenticity
export const isAuth = (req,res,next)=>{
  
  try{
    const token = req.cookies?.token
    || req?.body?.token
    || req.header('Authorisation').replace('Bearer ',"");

    if (!token || token===undefined){
      return res.status(422).json({
        success:false,
        message:'Token missing'
      })
    }

    // varify token
    let payload={};
    try{
      payload = jwt.verify(token,process.env.JWT_SECRET);
      
      // console.log('payload',payload)
    }catch(err){
      console.log("Verify JWT Token Error : ",err.message); 
      return res.status(400).json({
        success:false,
        message:'Failed to verify token'
      })
    }

    req.user = payload;

    return next();

  }catch(error){
    console.log("isAuth middleware error ",error.message)
    return res.status(401).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }

}

// check user is seller or NOT
export const isPatient = (req,res,next)=>{
  
  try{
    let payload = req.user;
    
    if(payload.role!=='patient'){
      return res.status(401).json({
        success:false,
        message:'Protected route for patient'
      })
    }
    return next();

  }catch(error){
    console.log("patient  middleware error ",error.message)
    res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

// check user is seller or NOT
export const isDoctor = (req,res,next)=>{
  
  try{
    let payload = req.user;
    if(payload.role!=='doctor'){
      return res.status(401).json({
        success:false,
        message:'Protected route for doctor'
      })
    }
    return next();

  }catch(error){
    console.log("doctor  middleware error ",error.message)
    res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

// check user is seller or NOT
export const isNurse = (req,res,next)=>{
  
  try{
    let payload = req.user;
    
    if(payload.role!=='nurse'){
      return res.status(401).json({
        success:false,
        message:'Protected route for nurse'
      })
    }
    return next();

  }catch(error){
    console.log("nurse  middleware error ",error.message)
    return res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

