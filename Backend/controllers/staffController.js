// controllers/staffController.js
import { Staff } from "../models/staff";

export const getRoster = async (req, res) => {
  try {
    const roster = await Staff.find({ isActive: true });
    res.json(roster);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
};

export const updateRoster = async (req, res) => {
  const { staffId, shift, department } = req.body;
  try {
    const updated = await Staff.findByIdAndUpdate(
      staffId,
      { shift, department },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update roster' });
  }
};