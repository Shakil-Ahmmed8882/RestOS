import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ReusableModal = ({
  isOpen,
  onOpenChange,
  headerContent = "Modal Title",
  bodyContent,
  footerContent,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{headerContent}</ModalHeader>
            <ModalBody>{bodyContent}</ModalBody>
            <ModalFooter>{footerContent || (
              <>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </>
            )}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReusableModal;
