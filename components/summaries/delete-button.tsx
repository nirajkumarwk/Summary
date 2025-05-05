"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import deleteSummary from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
     
      const result = await deleteSummary({ summaryId });
      if (!result.success) {
        toast.error("Failed to delete summary");
      }
      console.log("Error toast");
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-white hover:bg-rose-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className=" bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete' }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
