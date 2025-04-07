import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: String,
  totalStaff: Number,
  currentLoad: Number,
  requiredStaff: Number
});

export const Department =  mongoose.model('Department', departmentSchema);
