"use client";

import { createContext, useContext, useState } from "react";

type AuthStep = "sign-in" | "sign-up" | "forgot-password";

interface AuthModalContextType {
  open: boolean;
  step: AuthStep;
  openModal: (step?: AuthStep) => void;
  closeModal: () => void;
  setStep: (step: AuthStep) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("sign-in");

  const openModal = (newStep: AuthStep = "sign-in") => {
    setStep(newStep);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ open, step, openModal, closeModal, setStep }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
