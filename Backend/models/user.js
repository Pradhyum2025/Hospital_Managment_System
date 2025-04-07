import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
      },
    age:{
      type:Number,
    },
      lastName: {
        type: String,
        required: true,
      },
      profileImage:{
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "doctor", "nurse",, "patient"],
        default: "patient",
      },
      phoneNumber: {
        type: String,
        default: "",
      },
      dateOfBirth: {
        type: Date,
        default: "",
      },
      gender: {
        type: String,
        default: "",
      },
      appoinmentHistory :[
        {
          type:Schema.Types.ObjectId,
          ref: 'Appointment'
        }
      ]
 ,
});

export const User = mongoose.model("User", userSchema, "users");
