import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const signup = async (req, res) => {
  const { firstName, lastName, contact, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phoneNumber: contact
    });

    const savedUser = await newUser.save();
    let token, loggedInUser;

    const payload = {
      id: savedUser._id,
      role: savedUser.role
    }

    token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    loggedInUser = savedUser;
    loggedInUser.token = token

    res.cookie('token', token).json({
      success: true,
      loggedInUser,
      message: 'User SignUp  successful!'
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user;
    let isPasswordValid = false;

    user = await User.findOne({ email });

    if (user) {
      isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        let token, loggedInUser;

        const payload = {
          id: user._id,
          role: user.role
        }

        token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });

        loggedInUser = user;
        loggedInUser.token = token

        res.cookie('token', token).json({
          success: true,
          loggedInUser,
          message: 'User Logged in successful!'
        });

      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "User not found"
      }
      )
    }
  } catch (error) {
    console.log('Internal Server error', error.message)
    res.status(401).json({
      success: false,
      message: "Internal Server error"
    }
    )
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User Logged Out" });
};

