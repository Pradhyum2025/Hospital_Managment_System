import express from 'express'
import { login, signup } from '../controllers/authController.js';

const authRouter = express.Router();

//signup route
authRouter.post('/signup',signup);

//login route
authRouter.post('/login',login);


export default authRouter;