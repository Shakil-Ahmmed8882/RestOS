// CustomConfirmModal.tsx
import React, { useState } from "react";
import { Modal, Button, Flex } from "antd";
import { WarningIcon } from "../../assets/icons/Icons";
import RSPrimaryButton from "../ui/RSPrimaryButton";

// const ConfirmModal = ({ content, onOk, customFooter }) => {
const ConfirmModal = ({content, onOk,}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    onOk();
    setVisible(false);
};

const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal
        visible={visible}
        title={
          <Flex gap={5} align="center">
            <WarningIcon /> <h2 className="md:text-[22px]">Are you sure?</h2>
          </Flex>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <RSPrimaryButton handleClick={handleOk} label={"ok"} />
            </>
          )
        }
      >
        <p className="pl-9">{content || "This won't be revert"}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
