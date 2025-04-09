import React from "react";
import {
  ChevronsUpDown,
  LogOut, // Icons from lucide-react
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"; // UI components for user avatar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"; // Dropdown menu UI components
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar"; // Sidebar UI components
import { LogOutAction } from "../../store/slices/LoginSlice"; // Redux action for logging out
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// The NavUser component displays the user information and allows them to log out
export function NavUser({ user }) {
  // Accessing user details from Redux store
  const { userDetails } = useSelector((state) => state.LoginReducer);

  // Accessing isMobile flag from the sidebar state
  const { isMobile } = useSidebar();
  
  const dispatch = useDispatch();  // Dispatch function to trigger actions
  const navigate = useNavigate();  // Navigation hook to redirect to different routes

  // Function to handle logging out the user
  const Logout = () => {
    dispatch(LogOutAction());  // Dispatching the logout action to reset user state
    navigate("/login");        // Navigating the user to the login page
  };

  // Capitalizing the first letter of the first name and last name
  const capitalizedFirstName = (userDetails ?? {})?.first_name?.charAt(0)?.toUpperCase() + userDetails?.first_name?.slice(1);
  const capitalizedLastName = (userDetails ?? {})?.last_name?.charAt(0)?.toUpperCase() + userDetails?.last_name?.slice(1);

  // Extracting initials from first and last names to display as fallback in avatar
  const result = capitalizedFirstName.charAt(0) + capitalizedLastName.charAt(0);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Trigger for the dropdown menu */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Display the user avatar and basic info */}
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{result}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              {/* Icon to indicate a dropdown menu */}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown content */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}  // Dropdown alignment based on screen size
            align="end"
            sideOffset={4}
          >
            {/* Display user info in the dropdown */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{result}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* Divider */}
            <DropdownMenuSeparator />
            {/* Log out button */}
            <DropdownMenuItem onClick={Logout}> {/* onClick event to trigger logout */}
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
