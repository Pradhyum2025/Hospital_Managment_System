import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';
import bodyParser from 'body-parser';

// import listingRouter from './routes/listing.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import fileUpload from "express-fileupload";


// import reviewRouter from './routes/review.js';
import connectCloudinary from './config/connectCloudinary.js';

import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoute.js';
import { userRouter } from './routes/user.js';
import { doctorRouter } from './routes/doctorRoute.js';
import { appointmentRouter } from './routes/Appoinment.js';

//load env files
dotenv.config();
const app = express();

//parse json data from body
app.use(cors({
  // origin:'https://e-commerce-frontend-n6rg.onrender.com',
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON payload size
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(fileUpload({
  useTempFiles: true
}));

//config connectCloudinary
connectCloudinary();


//connect with DB
connectDB();


// routes
app.use('/auth', authRouter);
app.use('/doctor',doctorRouter)
app.use("/appoinment",appointmentRouter)
app.use('/user',userRouter)



const PORT  = process.env.PORT || 4040;
app.listen(PORT,()=>{
  console.log(`Port has listen at port number ${PORT} `)
})

