import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";

export function UsersActionDialog({ open, onOpenChange, currentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    status: "Active",
    role: "User",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    } else {
      setFormData({
        username: "",
        name: "",
        email: "",
        phone: "",
        status: "Active",
        role: "User",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("User Data Submitted:", formData);
    onOpenChange(false); // Close dialog after submission
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{currentUser ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Invited">Invited</option>
            <option value="Suspended">Suspended</option>
          </select>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Superadmin">Superadmin</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentUser ? "Update" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
