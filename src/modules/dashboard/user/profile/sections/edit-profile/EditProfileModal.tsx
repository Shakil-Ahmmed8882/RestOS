"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { EditProfilePage } from "./EditProfilePage";
import { EditPreferencesPage } from "./EditPreferencesPage";
import type { ProfileUser } from "../../types";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: ProfileUser | null;
};

export function EditProfileModal(props: Props) {
  const { isOpen, onOpenChange, user } = props;
  if (!user?._id) return null;

  return (
    <MultipageModal open={isOpen} onOpenChange={onOpenChange} initialPageId="edit" className="!max-w-[640px]">
      <MultipageModal.Page id="edit" maxWidth="max-w-[640px]">
        <EditProfilePage user={user} onClose={() => onOpenChange(false)} />
      </MultipageModal.Page>
      <MultipageModal.Page id="preferences" backTitle="Back to profile" maxWidth="max-w-[640px]">
        <EditPreferencesPage user={user} />
      </MultipageModal.Page>
    </MultipageModal>
  );
}
