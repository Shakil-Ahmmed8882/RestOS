import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectToken,
  selectUser,
} from "../../../redux/features/auth/auth.slice";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { toast } from "sonner";
import verifyToken from "../../../helpers/verifyToken";
import { USER_ROLE } from "../../../constants";

type DropdownProps = {
  triggerElement: ReactNode | string;
};

export default function AppDropdown({ triggerElement }: DropdownProps) {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const decodedUser = verifyToken(`${token}`);
  const url = `${decodedUser.role === USER_ROLE.ADMIN ? "admin" : "user"}`;

  const handleSignOut = () => {
    navigate("/");
    logOut()
      .then(() => {
        toast.success("Signed out");
        dispatch(logout());
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
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownItem onClick={() => navigate(`/${url}/dashboard/profile`)}>
          Profile
        </DropdownItem>
        <DropdownItem
          color={"danger"}
          className={"text-danger"}
          onClick={() => handleSignOut()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
