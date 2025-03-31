import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "../../components/ui/sidebar";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { sidebarData } from "./data/sidebar-data";
import { useSelector } from "react-redux";

export function AppSidebar(props) {

  const { userDetails } = useSelector((state) => state.LoginReducer);



  let user = {
    name: userDetails?.first_name + " "+ userDetails?.last_name,
    email: userDetails?.email,
    avatar: '/avatars/shadcn.jpg',
  }

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={user} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
