"use client";

import { useAppSelector } from "@/redux/hooks";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

/**
 * Returns the current user + a guard.
 *
 * `requireAuth()` returns true when authenticated; otherwise opens the
 * global sign-in modal page and returns false. Wrap any user-action
 * handler in a one-line guard before doing the mutation.
 */
export function useRequireAuth() {
  const user = useAppSelector((s) => s?.auth?.user);
  const { goTo, open } = useMultipageModalSelector();

  const requireAuth = () => {
    if (user) return true;
    // The public layout already mounts a MultipageModal whose initial page
    // is "sign-in". If the modal isn't open yet, `open()` flips it; if it
    // is open on a different page, `goTo` swaps to sign-in.
    try {
      open("sign-in");
    } catch {
      goTo("sign-in");
    }
    return false;
  };

  return { user, requireAuth };
}
