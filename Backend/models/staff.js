import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: String,
  role: {
    type:String,
    enum:['Doctor','nurse']
  },
  department: String,
  contact: String,
  shift: String,
  isActive: Boolean
});

export const Staff =  mongoose.model('Staff', staffSchema);
