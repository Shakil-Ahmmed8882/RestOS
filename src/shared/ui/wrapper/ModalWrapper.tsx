import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type ModalWrapperProps = {
  children: React.ReactNode;
  triggerElement: string | React.ReactNode; // Changed from buttonLabel to triggerElement
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  isActionButton?: boolean;
  title?: string;
  isOpen: boolean; // Controlled by the parent
  onOpen?: () => void; // Parent function to open the modal
  onClose: () => void; // Parent function to close the modal
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  title,
  children,
  triggerElement,
  size = "md",
  isActionButton,
  isOpen,
  onOpen,
  onClose,
}) => {

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
          <ModalHeader className="flex flex-col gap-1 py-1  text-3xl mt-2 ">{title || ""}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {
                isActionButton && <Button className="bg-primaryColor text-[white]" onPress={onClose}>
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
