import { Link } from 'react-router-dom'; // For navigation
import { IconMenu } from '@tabler/icons-react'; // Menu icon for mobile
import { cn } from "../../lib/utils"; // Utility for conditional class names
import { Button } from '@/components/ui/button'; // Button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Dropdown menu components

export function TopNav({ className, links, ...props }) {
  return (
    <>
      {/* Mobile Dropdown */}
      <div className='md:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <IconMenu /> {/* Menu icon for mobile */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links
              .filter(({ disabled }) => !disabled) // Filter out disabled links
              .map(({ title, href, isActive }) => (
                <DropdownMenuItem key={`${title}-${href}`} asChild>
                  <Link
                    to={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={!isActive ? 'text-muted-foreground' : ''} // Style inactive links differently
                  >
                    {title}
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6', // Mobile-first, hides on mobile, shows on larger screens
          className
        )}
        {...props}
      >
        {links.map(({ title, href, isActive, disabled }) => (
          <Link
            key={`${title}-${href}`}
            to={disabled ? '#' : href} // Prevent navigation for disabled links
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary', // Base styles
              isActive ? '' : 'text-muted-foreground', // Style active and inactive links differently
              disabled && 'pointer-events-none opacity-50' // Disable clicks for disabled links
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}
