import express from 'express'
import {  chnageAppoinmentStatus, createNewAppoinment, getMyAppoinment, scheduleAppoinment } from '../controllers/appointmentController.js';
import { isAuth, isDoctor, isPatient } from '../middleware/auth.js';
export const appointmentRouter = express.Router();

appointmentRouter.get("/",isAuth,getMyAppoinment);

appointmentRouter.post("/",isAuth,isPatient,createNewAppoinment);
appointmentRouter.patch("/schedule/:appoinmentId",isAuth,isDoctor,scheduleAppoinment);
appointmentRouter.patch("/status/:appoinmentId",isAuth,isDoctor,chnageAppoinmentStatus);
