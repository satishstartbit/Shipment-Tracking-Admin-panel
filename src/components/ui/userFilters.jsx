import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";

export function UserFilters({ filter, setFilter, selectedStatus, setSelectedStatus, selectedRole, setSelectedRole }) {
  return (
    <div className="flex space-x-4 ">
      <Input
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-1/2"
      />

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedStatus || "Status"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {["Active", "Inactive", "Invited", "Suspended"].map((status) => (
            <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
              {status}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setSelectedStatus("")}>Clear</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedRole || "Role"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {["Admin", "Superadmin", "Manager", "Cashier"].map((role) => (
            <DropdownMenuItem key={role} onClick={() => setSelectedRole(role)}>
              {role}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setSelectedRole("")}>Clear</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
