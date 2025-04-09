import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"; // Importing the DropdownMenu and DropdownMenuTrigger components from your custom UI library
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar"; // Importing SidebarMenu related components from your UI library
import logo from "../../assets/img/logo.png"; // Importing the logo image

// TeamSwitcher component which will allow switching teams or displaying related actions
export function TeamSwitcher() {
  return (
    <SidebarMenu> {/* Wrapper for the sidebar menu */}
      <SidebarMenuItem> {/* A single item in the sidebar menu */}
        <DropdownMenu> {/* The dropdown menu container */}
          <DropdownMenuTrigger asChild> {/* Trigger element that opens the dropdown menu */}
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* This button contains the logo and is used as the dropdown menu trigger */}
              <div className="flex rounded-[20px] overflow-hidden justify-center">
                <img
                  src={logo} // The logo image that will be displayed in the menu
                  className="w-40 h-30 object-contain rounded-[20px] p-2"
                />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
