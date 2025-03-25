
import { Routes, Route, Outlet } from "react-router-dom";
import { cn } from "../../lib/utils";
import React, { useEffect } from "react";

import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { LayoutRoutes } from "../../routes-navs/LayoutRoutes"; // Imported LayoutRoutes
import { ChangeScreenViewAction } from "../../store/slices/SideBarSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
const LayoutMain = () => {

  const dispatch = useDispatch();
  const isDesktopScreenSize = useMediaQuery({ minWidth: 770 });
  useEffect(() => {
    if (isDesktopScreenSize) {
      dispatch(ChangeScreenViewAction({ IsMobile: false }));
    } else {
      dispatch(ChangeScreenViewAction({ IsMobile: true }));
    }
  }, [isDesktopScreenSize]);


  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] duration-200 ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
        )}
      >

        <Header />
        <Routes>
          {LayoutRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Routes>

        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default LayoutMain;
