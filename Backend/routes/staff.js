import { getRoster, updateRoster } from "../controllers/staffController";

const staffRouter = express.Router();

// Staff Roster
staffRouter.get('/roster', getRoster);
staffRouter.post('/roster/update', updateRoster);
