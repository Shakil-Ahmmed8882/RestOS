"use client";

import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddFoodForm } from "./AddFoodForm";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddFoodModal(props: Props) {
  const { isOpen, onOpenChange } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
              <Icon icon="solar:bag-plus-linear" className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            Add New Food
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Create a new menu item for your restaurant
          </p>
        </DialogHeader>
        <AddFoodForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
