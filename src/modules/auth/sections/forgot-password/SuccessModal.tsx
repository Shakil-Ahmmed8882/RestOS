"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

interface SuccessModalProps {
  email: string;
  onClose?: () => void;
}

export function SuccessAuthModal({ email, onClose }: SuccessModalProps) {
  const { goBack } = useMultipageModalSelector();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-7 p-8 bg-white dark:bg-[#121212]  rounded-2xl"
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
          <div className="relative bg-green-100 dark:bg-green-950 rounded-full p-4">
            <Icon icon="solar:check-circle-linear" className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </motion.div>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Check your email</h1>
        <p className=" text-muted-foreground">
          We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="space-y-3 bg-green-400 dark:bg-green-950 rounded-lg p-4 ">
        <p className=" font-medium text-primary dark:text-green-400">💡 Pro tip:</p>
        <p className=" leading-loose text-green-400 dark:text-green-400">
          If you don&apos;t see the email, please check your <b>spam</b> or <b>junk</b> folder. <br/> Sometimes reset emails end up there!
        </p>
      </div>

        <p className=" text-muted-foreground text-center">
          The link will expire in 10 minutes for security reasons.
        </p>
      <div className="space-y-3">
        <Button onClick={() => goBack()} className="w-full rounded-full text-white" size="lg">
          Back to sign in
        </Button>
      </div>
    </motion.div>
  );
}
