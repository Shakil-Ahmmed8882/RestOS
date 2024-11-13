import React from "react";
import { Button } from "@nextui-org/react";
import { ModalWrapper } from "../wrapper/ModalWrapper";


interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title = "Are you sure?",
  message = "Do you want to proceed with this action?",
  onConfirm,
  onCancel,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    title={title}
    footer={
      <>
        <Button color="danger" className="bg-deepPink/5" variant="light" onPress={onCancel || onOpenChange}>
          Cancel
        </Button>
        <Button className="bg-primaryColor/5 text-primaryColor hover:bg-primaryColor/20" onPress={onConfirm}>
          Confirm
        </Button>
      </>
    }
  >
    <p>{message}</p>
  </ModalWrapper>
);
