import express from'express';
import { getAllDoctors } from '../controllers/userController.js';
export const doctorRouter = express.Router();

doctorRouter.get("/",getAllDoctors);