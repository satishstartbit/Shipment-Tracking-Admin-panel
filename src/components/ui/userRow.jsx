import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function UserRow({ user }) {
  return (
    <tr className="border-b">
      <td className="p-3">{user.username}</td>
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.phone}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-xs ${
            user.status === "Active"
              ? "bg-green-100 text-green-700"
              : user.status === "Inactive"
              ? "bg-gray-100 text-gray-700"
              : user.status === "Invited"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="p-3">{user.role}</td>
      <td className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1">
              <DotsHorizontalIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Edit", user)}>
              Edit
              <IconEdit className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete", user)}
              className="text-red-500"
            >
              Delete
              <IconTrash className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
