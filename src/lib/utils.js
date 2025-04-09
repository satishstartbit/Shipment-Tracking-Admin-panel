import { clsx } from 'clsx';  // Import the clsx library for conditionally joining class names
import { twMerge } from 'tailwind-merge';  // Import tailwind-merge for resolving conflicting Tailwind CSS classes

// Function to conditionally apply class names and merge conflicting Tailwind classes
export function cn(...inputs) {
  // First, we use clsx to conditionally join the class names and pass the result to twMerge
  // twMerge will merge any conflicting Tailwind classes, ensuring the correct ones are applied
  return twMerge(clsx(inputs));
}
