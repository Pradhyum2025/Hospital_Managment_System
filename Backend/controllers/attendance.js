import { Attendance } from "../models/attendance";
import { Staff } from "../models/staff";
import { Attendance } from "../models/attendance";


export const getAttendance = async (req, res) => {
  const { staffId } = req.params;
  try {
    const attendance = await Attendance.find({ staffId }).sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

export const clockIn = async (req, res) => {
  const { staffId } = req.body;
  try {
    const today = new Date();
    const clockedIn = await Attendance.create({
      staffId,
      date: today,
      clockInTime: today,
      leaveRequested: false
    });
    res.json(clockedIn);
  } catch (err) {
    res.status(500).json({ error: 'Failed to clock in' });
  }
};

export const clockOut = async (req, res) => {
  const { staffId } = req.body;
  try {
  const today = new Date();
    const clockedOut = await Attendance.findOneAndUpdate(
      { staffId, date: { $gte: new Date().setHours(0, 0, 0, 0) } },
      { clockOutTime: today },
      { new: true }
    );
    res.json(clockedOut);
  } catch (err) {
    res.status(500).json({ error: 'Failed to clock out' });
  }
};

export const requestLeave = async (req, res) => {
  const { staffId, date } = req.body;
  try {
    const leave = await Attendance.create({
      staffId,
      date: new Date(date),
      leaveRequested: true
    });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: 'Failed to request leave' });
  }
};
