import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

type ModalWrapperProps = {
  children: React.ReactNode;
  triggerElement: string | React.ReactNode;  // Changed from buttonLabel to triggerElement
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  isActionButton: boolean
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, triggerElement, size = 'md', isActionButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Button to open the modal */}
      {typeof triggerElement === 'string' ? (
        <Button onPress={onOpen}>{triggerElement}</Button>
      ) : (
        <div onClick={onOpen}>{triggerElement}</div> // Render directly if it's a React node
      )}

      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {
                isActionButton && <Button color="primary" onPress={onClose}>
                Action
              </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
