import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React, { ReactNode } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  isOpen, 
  onOpenChange, 
  title = "Modal Title", 
  children, 
  footer 
}) => (
  <Modal  isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            {footer || (
              <>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </>
            )}
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);
