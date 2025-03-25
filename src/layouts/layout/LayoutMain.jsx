import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../lib/utils";

import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";


const LayoutMain = () => {


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
          <Outlet />
        </div>
      </SidebarProvider>

  );
};

export default LayoutMain;
