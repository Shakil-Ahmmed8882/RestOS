"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { SignInForm } from "@/modules/auth/sections/sign-in/SignInForm";
import { SignUpForm } from "@/modules/auth/sections/sign-up/SignUpForm";
import { ForgotPasswordForm } from "@/modules/auth/sections/forgot-password/ForgotPasswordForm";
import { useAuthModal } from "@/modules/auth/context/AuthModalContext";

export function AuthModal() {
  const { open, step, closeModal, setStep } = useAuthModal();

  return (
    <MultipageModal open={open} onOpenChange={(newOpen) => !newOpen && closeModal()} initialPageId={step}>
      <MultipageModal.Page
        id="sign-in"
        backTitle="Back"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 px-6 pt-4 pb-6">
          <SignInForm />
          <div className="space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setStep("sign-up")}
                className="font-semibold text-primary hover:underline"
              >
                Sign up free
              </button>
            </p>
            <p className="text-muted-foreground">
              <button
                onClick={() => setStep("forgot-password")}
                className="font-semibold text-primary hover:underline"
              >
                Forgot password?
              </button>
            </p>
          </div>
        </div>
      </MultipageModal.Page>

      <MultipageModal.Page
        id="sign-up"
        backTitle="Back"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 px-6 pt-4 pb-6">
          <SignUpForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => setStep("sign-in")}
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </MultipageModal.Page>

      <MultipageModal.Page
        id="forgot-password"
        backTitle="Back"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 px-6 pt-4 pb-6">
          <ForgotPasswordForm />
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <button
              onClick={() => setStep("sign-in")}
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </MultipageModal.Page>
    </MultipageModal>
  );
}
