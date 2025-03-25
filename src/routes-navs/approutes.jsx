import { Navigate } from "react-router";
import LoginUser from "../page/LoginUser";
export const approutes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginUser /> }
];

