import Companies from "../model/companies/Companies";
import User from "../model/user/User";
import { AddUserDialog } from "../components/ui/userForm"
import { AddCompany } from "../model/companies/AddCompany"
import { Navigate } from "react-router";

export const LayoutRoutes = [
  {
    path: "/companies",
    element: <Companies />,
    roles: "*",
  },
  {
    path: "/users",
    element: <User />,
    roles: "*",
  },
  
  {
    path: "/createuser",
    element: <AddUserDialog />,
    roles: "*",
  },
  {
    path: "/edituser/:id",
    element: <AddUserDialog />,
    roles: "*",
  },
  {
    path: "/createcompany",
    element: <AddCompany />,
    roles: "*",
  },
  {
    path: "/editcompany/:id",
    element: <AddCompany />,
    roles: "*",
  },
  {
    path: "/*",
    element: <Navigate to="/users" replace />,
    roles: "*",
  },
];


