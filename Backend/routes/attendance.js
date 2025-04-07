import { clockIn, clockOut, getAttendance, requestLeave } from "../controllers/attendance";

const attendanceRouter = express.Router();

// Attendance
attendanceRouter.get('/attendance/:staffId', getAttendance);
attendanceRouter.post('/attendance/clockin', clockIn);
attendanceRouter.post('/attendance/clockout', clockOut);
attendanceRouter.post('/attendance/leave', requestLeave);
