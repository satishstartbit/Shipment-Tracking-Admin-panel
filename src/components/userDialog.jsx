import { useState } from "react";
import { UsersActionDialog } from "./ui/userActionDialog";
import { UsersDeleteDialog } from "./ui/UsersDeleteDialog";


export function UsersDialogs() {
  const [openDialog, setOpenDialog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenDialog = (type, user = null) => {
    setCurrentUser(user);
    setOpenDialog(type);
  };

  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={openDialog === "add"}
        onOpenChange={() => setOpenDialog(null)}
      />

  

      {currentUser && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentUser.username}`}
            open={openDialog === "edit"}
            onOpenChange={() => setOpenDialog(null)}
            currentUser={currentUser}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentUser.username}`}
            open={openDialog === "delete"}
            onOpenChange={() => setOpenDialog(null)}
            currentUser={currentUser}
          />
        </>
      )}
    </>
  );
}
