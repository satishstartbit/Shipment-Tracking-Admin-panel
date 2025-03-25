import { Dialog, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./dialog";
import { Button } from "./button";

export function UsersDeleteDialog({ open, onOpenChange, currentRow, onDelete }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Delete User</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <p className="text-gray-700">
        Are you sure you want to delete <strong>{currentRow?.name}</strong>? This action cannot be undone.
      </p>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button variant="destructive" onClick={() => onDelete(currentRow)}>Delete</Button>
      </DialogFooter>
    </Dialog>
  );
}
