import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  date: Date,
  clockInTime: Date,
  clockOutTime: Date,
  leaveRequested: Boolean
});

export const Attendance =  mongoose.model('Attendance', attendanceSchema);
