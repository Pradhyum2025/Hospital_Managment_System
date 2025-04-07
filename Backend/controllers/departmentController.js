import { Department } from "../models/department";

export const getDepartmentOverview = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch department overview' });
  }
};

export const getNotifications = async (req, res) => {
  const { staffId } = req.params;
  try {
    // Placeholder logic for notifications
    res.json([
      { message: 'Upcoming shift change on Friday' },
      { message: 'Overtime request approved' } 
    ]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};