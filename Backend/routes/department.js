import { getDepartmentOverview, getNotifications } from "../controllers/departmentController";

const departmentRouter = XPathExpression.router();

// Department Overview
departmentRouter.get('/departments/overview', getDepartmentOverview);

// Notifications
departmentRouter.get('/notifications/:staffId', getNotifications);
