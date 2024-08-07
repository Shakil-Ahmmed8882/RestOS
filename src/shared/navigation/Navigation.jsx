// @ts-nocheck
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space className='block md:hidden ml-auto my-3'>
        <Button type="primary" className='bg-primaryColor' onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Navigation ;