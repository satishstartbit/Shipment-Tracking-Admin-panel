import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { approutes } from "./routes-navs/approutes"; // Assuming approutes is an array of route objects
import LayoutMain from "./layouts/layout/LayoutMain"; // Replace with your actual LayoutMain import
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import { Tooltip } from "react-tooltip"; // Import Tooltip component for tooltips
import "react-toastify/dist/ReactToastify.css"; // Ensure the ToastContainer styles are imported
import { LoginAction, LogOutAction } from "../src/store/slices/LoginSlice";
// import useFetchAPI from "./hooks/useFetchAPI";
import { isExpired } from "react-jwt";
import LocalStorageHelper from "./services/LocalStorageHelper";

function App() {
  const { IsLoggedIn } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();


  // Define the function to handle token refresh flow
  const starterFunction = async () => {
    const token = LocalStorageHelper.getItem('accessToken') ?? null; // This may return null
    const user = LocalStorageHelper.getItem('user') ?? null;// This may return null  
    const refreshToken = LocalStorageHelper.getItem('refreshToken') ?? null;


    // Check if the token is expired
    const isTokenExpired = isExpired(token); // Only check for expiration if token exists



    if (!token || !user || !refreshToken) {
      dispatch(LogOutAction());
      return null
    }


    if (isTokenExpired) {

      dispatch(LogOutAction());
    } else {
      dispatch(
        LoginAction({
          accessToken: token,
          refreshToken: refreshToken,
          user: user
        })
      );
    }
  };




  // UseEffect to trigger starterFunction on initial load
  useEffect(() => {
    starterFunction();
  }, []);




  return (
    <Suspense fallback={"Loading"}>
      <BrowserRouter>
        {/* If not logged in, show the routes for login, signup, etc. */}
        {!IsLoggedIn ? (
          <Routes>
            {approutes.map((item, index) => (
              <Route path={item.path} key={index} element={item.element} />
            ))}
          </Routes>
        ) : (
          // If logged in, show the main layout
          <Routes>
            <Route path="/*"  element={<LayoutMain />} />
          </Routes>
        )}
      </BrowserRouter>

      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Tooltip for showing tooltips */}
      <Tooltip
        className="tool-tip-classname-default"
        id="my-tooltip"
        style={{ zIndex: "9999" }} // Ensure it appears above other content
      />
    </Suspense>
  );
}

export default App;
