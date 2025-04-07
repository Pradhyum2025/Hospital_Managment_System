import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  patient: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
    required:true
  },
  time:{
    type: String,
    default:Date.now()
  },
  reason: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["scheduled", "inProgress", "completed", "cancelled"],
    default: "inProgress",
  },
  notes: {
    type: String,
  },
  department:{
    type: String,
  },
  email:{
    type: String,
    required: true,
  }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
