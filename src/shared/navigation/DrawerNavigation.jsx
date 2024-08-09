// @ts-nocheck
import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { homePagePaths } from "../../Routes/homePageRoutes";
import { NavLink } from "react-router-dom";

const DrawerNavigation = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

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
      <Space className="block md:hidden ml-auto my-3">
        <Button type="primary" className="bg-primaryColor" onClick={showDrawer}>
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
        <article className=" flex flex-col items-start gap-2">
          {homePagePaths?.map((route) => {
            if (route && route.name) {
              return (
                <NavLink
                  onClick={onClose}
                  key={route.name}
                  className={`
                            ${route?.className}
                            p-2 px-5  transition-all duration-700 rounded-full`}
                  to={route?.path}
                >
                  {route.name}
                </NavLink>
              );
            }
          })}
        </article>
      </Drawer>
    </>
  );
};

export default DrawerNavigation;
