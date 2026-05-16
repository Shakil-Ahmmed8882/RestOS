"use client";

import { Icon } from "@iconify/react";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

export function AddUserSuccess() {
  const { close } = useMultipageModalSelector();

  return (
    <div className="bg-theme rounded-2xl px-10 py-14 flex flex-col items-center text-center">
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl scale-[1.6]" />
        <div className="relative h-24 w-24 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
          <Icon icon="solar:check-circle-bold" className="h-12 w-12 text-green-500" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        User Created
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-xs">
        The new user has been added to your platform and is already visible in the list.
      </p>

      <BaseButton
        size="lg"
        intent="primary"
        onClick={close}
        className="text-white px-10 w-full rounded-xl"
      >
        Close
      </BaseButton>
    </div>
  );
}
