"use client";

import { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

interface AuthGuardProps {
  children: ReactNode;
  onUnauthorized?: () => void;
}

export function AuthGuard({ children, onUnauthorized }: AuthGuardProps) {
  const user = useAppSelector((s) => s.auth.user);
  const { goTo } = useMultipageModalSelector();

  const handleAction = () => {
    if (!user) {
      goTo("sign-in");
      onUnauthorized?.();
      return false;
    }
    return true;
  };

  return <div onClick={(e) => !handleAction() && e.preventDefault()}>{children}</div>;
}

export function useAuthGuard() {
  const user = useAppSelector((s) => s.auth.user);
  const { goTo } = useMultipageModalSelector();

  const requireAuth = () => {
    if (!user) {
      goTo("sign-in");
      return false;
    }
    return true;
  };

  return { user, requireAuth };
}
