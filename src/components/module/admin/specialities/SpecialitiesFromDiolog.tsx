"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSpeciality } from "@/services/admin/specialities";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface ISpecialitiesFromDiologProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialitiesFromDiolog = ({
  open,
  onClose,
  onSuccess,
}: ISpecialitiesFromDiologProps) => {
  const [state, formAction, pending] = useActionState(createSpeciality, null);

  useEffect(() => {
    console.log("State => ", state);

    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else {
      toast.error(state.message);
    }
  }, [onClose, onSuccess, state]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Speciality</DialogTitle>
          <DialogDescription>
            Provide the speciality title and icon.
          </DialogDescription>
        </DialogHeader>

        {/* FORM MUST BE INSIDE DIALOG CONTENT */}
        <form action={formAction} encType="multipart/form-data" className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="file">Icon</Label>
            <Input id="file" name="file" type="file" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Specialty"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialitiesFromDiolog;
