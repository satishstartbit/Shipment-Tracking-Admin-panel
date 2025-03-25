import Dashboard from "../model/dashboard/Dashboard";
import Task from "../model/task/Task";
import User from "../model/user/User";

export const LayoutRoutes = [
  {
    path: "/dashboard",  // Fixed typo "dashboad" -> "dashboard"
    element: <Dashboard />,
    roles: "*",
  },
  {
    path: "/tasks",
    element: <Task />,
    roles: "*",
  },
  {
    path: "/users",
    element: <User />,
    roles: "*",
  },
];


