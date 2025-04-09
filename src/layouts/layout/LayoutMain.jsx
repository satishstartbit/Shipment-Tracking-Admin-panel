import { Routes, Route, Outlet } from "react-router-dom"; // Imports necessary components for routing
import React, { useEffect } from "react";
import "../../assets/css/layouts.css"; // Import global styles for the layout
import { SidebarProvider } from "../../components/ui/sidebar"; // Sidebar provider to manage sidebar state
import { AppSidebar } from "./app-sidebar"; // Sidebar component
import { Header } from "./header"; // Header component
import { LayoutRoutes } from "../../routes-navs/LayoutRoutes"; // Routes for the layout
import { ChangeScreenViewAction } from "../../store/slices/SideBarSlice"; // Redux action to change screen view state
import { useDispatch } from "react-redux"; // To dispatch actions to the Redux store
import { useMediaQuery } from "react-responsive"; // Hook to detect screen size for responsive design

const LayoutMain = () => {
  const dispatch = useDispatch(); // Initialize dispatch to send actions to Redux store
  const isDesktopScreenSize = useMediaQuery({ minWidth: 770 }); // Hook to detect if the screen size is larger than 770px (Desktop view)

  useEffect(() => {
    // Effect runs when screen size changes to dispatch whether the device is mobile or desktop
    if (isDesktopScreenSize) {
      // If the screen size is desktop (larger than 770px), update Redux store with IsMobile = false
      dispatch(ChangeScreenViewAction({ IsMobile: false }));
    } else {
      // Otherwise, update Redux store with IsMobile = true (for mobile view)
      dispatch(ChangeScreenViewAction({ IsMobile: true }));
    }
  }, [isDesktopScreenSize]); // This effect runs every time `isDesktopScreenSize` changes

  return (
    <SidebarProvider defaultOpen={true}> {/* SidebarProvider wraps the layout, managing the open state of the sidebar */}
      <AppSidebar /> {/* Sidebar component displayed on the left */}
      <div className="main-div"> {/* Container for the main content area */}
        <Header /> {/* Header displayed at the top */}
        
        <Routes> {/* Routes for different pages in the layout */}
          {LayoutRoutes.map((item, index) => ( // Dynamically render routes based on the LayoutRoutes array
            <Route key={index} path={item.path} element={item.element} /> // Define each route with its path and corresponding component
          ))}
        </Routes>

        <Outlet /> {/* Outlet component for rendering nested routes */}
      </div>
    </SidebarProvider>
  );
};

export default LayoutMain; // Export the LayoutMain component as the default export
