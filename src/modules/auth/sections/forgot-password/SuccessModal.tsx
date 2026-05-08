"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";


interface SuccessModalProps {
  email: string;
  onClose?: () => void;
}

export function SuccessAuthModal({ email, onClose }: SuccessModalProps) {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full max-w-md space-y-6"
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
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="space-y-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">💡 Pro tip:</p>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          If you don&apos;t see the email, please check your spam or junk folder. Sometimes reset emails end up there!
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          The link will expire in 10 minutes for security reasons.
        </p>
        <Button onClick={handleBackToSignIn} variant="outline" className="w-full" size="lg">
          Back to sign in
        </Button>
      </div>
    </motion.div>
  );
}
