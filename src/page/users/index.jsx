import { useState } from "react";
import { UserRow } from "../../components/ui/userRow";
import { UserFilters } from "../../components/ui/userFilters";
import { Button } from "../../components/ui/button";
import { UsersDialogs } from "../../components/userDialog";
import { AddUserDialog } from "../../components/ui/userForm";

const initialUsers = [
  {
    username: "marc.sawayn",
    name: "Marc Sawayn",
    email: "marc.keeling21@yahoo.com",
    phone: "+18774928283",
    status: "Suspended",
    role: "Admin",
  },
  {
    username: "ewell.haag64",
    name: "Ewell Haag",
    email: "ewell.huel@hotmail.com",
    phone: "+14974008175",
    status: "Inactive",
    role: "Admin",
  },
  {
    username: "elvis_wiegand",
    name: "Elvis Wiegand",
    email: "elvis.ebert63@hotmail.com",
    phone: "+17255041951",
    status: "Active",
    role: "Superadmin",
  },
  {
    username: "bailey.oconnell-leffler",
    name: "Bailey O'Connell-Leffler",
    email: "bailey_collins93@gmail.com",
    phone: "+15714239309",
    status: "Invited",
    role: "Admin",
  },
  {
    username: "malvina.nienow24",
    name: "Malvina Nienow",
    email: "malvina57@yahoo.com",
    phone: "+18846305370",
    status: "Inactive",
    role: "Superadmin",
  },
  {
    username: "lonie_kreiger26",
    name: "Lonie Kreiger",
    email: "lonie52@gmail.com",
    phone: "+13704701928",
    status: "Invited",
    role: "Admin",
  },
  {
    username: "alessia.wunsch60",
    name: "Alessia Wunsch",
    email: "alessia86@hotmail.com",
    phone: "+18324589564",
    status: "Inactive",
    role: "Manager",
  },
  {
    username: "diamond_wiegand",
    name: "Diamond Wiegand",
    email: "diamond64@gmail.com",
    phone: "+15982162304",
    status: "Suspended",
    role: "Admin",
  },
  {
    username: "veda.beer",
    name: "Veda Beer",
    email: "veda.parisian2@gmail.com",
    phone: "+13635332643",
    status: "Invited",
    role: "Admin",
  },
  {
    username: "breanna_wuckert",
    name: "Breanna Wuckert",
    email: "breanna50@yahoo.com",
    phone: "+17492553020",
    status: "Suspended",
    role: "Cashier",
  },
];

export function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  // Apply filters
  const filteredUsers = users.filter(
    (user) =>
      (!filter ||
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())) &&
      (!selectedStatus || user.status === selectedStatus) &&
      (!selectedRole || user.role === selectedRole)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-[22px] font-semibold">Users</h2>
      <div className="flex justify-between items-center mb-4 mt-4 sm:flex-row sm:justify-between sm:items-center">
        <UserFilters
          filter={filter}
          setFilter={setFilter}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <Button onClick={() => setIsDialogOpen(true)} className="sm-w-[100%]">
          Add User
        </Button>
      </div>

      {/* Filters */}

      <div className="w-full overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm font-medium">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Status</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <UserRow key={user.username} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 sm-p-2">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Add User Dialog */}
      <AddUserDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        addUser={addUser}
      />

      {/* Additional Dialogs */}
      <UsersDialogs />
    </div>
  );
}
