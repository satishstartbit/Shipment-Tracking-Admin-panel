import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { approutes } from "./routes-navs/approutes"; // Assuming approutes is an array of route objects
import LayoutMain from "./layouts/layout/LayoutMain"; // Replace with your actual LayoutMain import
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import { Tooltip } from "react-tooltip"; // Import Tooltip component for tooltips
import "react-toastify/dist/ReactToastify.css"; // Ensure the ToastContainer styles are imported
import { LogOutAction, RefreshLoginAction } from "../src/store/slices/LoginSlice";
// import useFetchAPI from "./hooks/useFetchAPI";
import { isExpired } from "react-jwt";
import LocalStorageHelper from "./services/LocalStorageHelper";

function App() {
  const { IsLoggedIn } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();


  // // Define your Refresh API Hook
  // const [RefreshResponse, RefreshHandler] = useFetchAPI(
  //   {
  //     url: '/user/refresh',
  //     method: 'POST',
  //     authRequired: false,
  //     isRefreshCall: true,
  //   },
  //   (e) => {
  //     console.log("sdf");
  //     dispatch(
  //       RefreshLoginAction({
  //         accessToken: e?.accessToken
  //       })
  //     );
  //     return e;
  //   },
  //   (e) => {
  //     if (e?.response?.data === 'Invalid Refresh Token' || e?.response?.data === 'Refresh Token has been revoked') {
  //       dispatch(LogOutAction());
  //     }
  //     return e?.response ?? true;
  //   }
  // );

  // Define the function to handle token refresh flow
  const starterFunction = async () => {
    console.log("isTokenExpired");

    const token = LocalStorageHelper.getItem('accessToken'); // This may return null  
    console.log("token", token);

    const refreshToken = LocalStorageHelper.getItem('refreshToken');
    // Check if the token exists and if it is expired
    const isTokenExpired = token ? isExpired(token) : true;

    console.log("isTokenExpired", isTokenExpired);

    if (!isTokenExpired) {
      // If the access token is expired, use refresh token to get a new access token
      let body = { refreshToken: refreshToken };
      // await RefreshHandler({ body: body });
    } else {
      dispatch(LogOutAction());
    }
  };


  // const isTokenExpiredManually = (token) => {
  //   try {
  //     const decoded = isExpired(token);
  //     const currentTime = Date.now() / 1000;  // Current time in seconds
  //     return decoded.exp < currentTime; // Compare the expiration time with the current time
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return true;  // If the token is invalid or can't be decoded, consider it expired
  //   }
  // };

  // UseEffect to trigger starterFunction on initial load
  useEffect(() => {
    starterFunction();
  }, []);  // The empty array ensures it runs only on initial mount


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
            <Route path="/*" element={<LayoutMain />} />
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
