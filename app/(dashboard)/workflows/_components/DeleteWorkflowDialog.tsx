import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { DeleteWorkflow } from "@/actions/deleteWorkflow";

type DeleteWorkflowDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowId: string;
  workflowName: string;
};

function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowId,
  workflowName,
}: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {
        id: workflowId,
      });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Failed to delete workflow", {
        id: workflowId,
      });
      setOpen(false);
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setConfirmText("");
        setOpen(open);
      }}
    >
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover it.
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure , enter <strong>{workflowName}</strong> to
                confirm:
              </p>
            </div>
            <Input
              tabIndex={0}
              autoFocus
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            autoFocus
            onClick={() => {
              setConfirmText("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || isPending}
            onClick={() => {
              toast.loading("Deleting workflow...", { id: workflowId });
              mutate(workflowId);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
