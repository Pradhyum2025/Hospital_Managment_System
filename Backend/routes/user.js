import express from'express';
import { getAllDoctors, updateProfile } from '../controllers/userController.js';
import {isAuth} from '../middleware/auth.js'
export const userRouter = express.Router();

userRouter.patch("/profile-update",isAuth,updateProfile );

userRouter.get("/doctors",getAllDoctors);