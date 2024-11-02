import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { ReactNode, FC, useState, useEffect } from "react";

type DropdownProps = {
  items: { key: string; label: string; path?: string }[];
  triggerElement: ReactNode | string;
};

export default function AppDropdown({ items, triggerElement }: DropdownProps) {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(!user);

  useEffect(() => {
    if (!user) {
      setIsLoggedOut(true);
    } else {
      setIsLoggedOut(false);
    }
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed out");
        setIsLoggedOut(true);
      })
      .catch((err) => toast.error(err.toString()));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {typeof triggerElement === "string" ? (
          <Button>{triggerElement}</Button>
        ) : (
          triggerElement
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "logout" ? "danger" : "default"}
            className={item.key === "logout" ? "text-danger" : ""}
            onClick={() => {
              if (item.key === "logout") {
                handleSignOut();
                navigate("/");
              } else if (item.path) {
                navigate(item.path);
              }
            }}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

import { Popover, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Utils/useAuthHelper";
import toast from "react-hot-toast";
