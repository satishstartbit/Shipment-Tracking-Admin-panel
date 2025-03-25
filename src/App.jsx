import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { approutes } from "./routes-navs/approutes"; // Assuming approutes is an array of route objects
import LayoutMain from "./layouts/layout/LayoutMain"; // Replace with your actual LayoutMain import
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import { Tooltip } from "react-tooltip"; // Import Tooltip component for tooltips
import "react-toastify/dist/ReactToastify.css"; // Ensure the ToastContainer styles are imported

function App() {
  const { IsLoggedIn } = useSelector((state) => state.LoginReducer);

  console.log("IsLoggedIn", IsLoggedIn);

  return (
    // Suspense will display fallback (in this case, "Loading") until the app is ready
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
