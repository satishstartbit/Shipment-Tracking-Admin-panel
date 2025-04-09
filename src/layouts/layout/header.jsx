import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils"; // Utility function to combine class names
import { Separator } from "../../components/ui/separator"; // Separator component to add a visual line
import { SidebarTrigger } from "../../components/ui/sidebar"; // Sidebar trigger button

export const Header = ({ className, fixed, children, ...props }) => {
  // State to track the scroll position (offset) of the page
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Function to update the scroll position whenever the page is scrolled
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll event listener to track page scroll
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on component unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex h-16 items-center gap-3 bg-background p-4 sm:gap-4", // Default styles for the header
        fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md", // If fixed prop is passed, apply these styles for fixed positioning
        offset > 10 && fixed ? "shadow" : "shadow-none", // Apply shadow when scrolled past 10px
        className // Additional classes passed through props
      )}
      {...props} // Spread the remaining props on the header element
    >
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" /> {/* Button to trigger the sidebar */}
      <Separator orientation="vertical" className="h-6" /> {/* Vertical separator line */}
      
      {children} {/* Render any child components passed to the Header */}
    </header>
  );
};

// Setting display name for the component (helps with debugging)
Header.displayName = "Header";
