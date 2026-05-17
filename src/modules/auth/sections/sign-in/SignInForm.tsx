
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useSignIn } from "@/modules/auth/hooks/useSignIn";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AuthInput } from "@/modules/auth/components/AuthInput";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

// Demo accounts seeded in the database. Credentials come from public env
// vars so deploying with a different demo DB doesn't require code changes.
const DEMO_ACCOUNTS = [
  {
    label: "Admin",
    icon: "solar:shield-check-bold",
    // email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    // password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
    email: "restos-admin@gmail.com",
    password: "admin1234*$#",
  },
  {
    label: "User",
    icon: "solar:user-bold",
      // email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
      // password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
    email: "ruje@mailinator.com",
    password: "Pa$$w0rd!",
  },
] as const;

export function SignInForm() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    loginLoading,
  } = useSignIn();
  const { login } = useAuth();
  const { goTo, close } = useMultipageModalSelector();

  // Tracks which demo button is in flight, so only that one shows a
  // spinner and other inputs are disabled across the form.
  const [demoLoadingLabel, setDemoLoadingLabel] = useState<string | null>(null);

  const handleDemoSignIn = async (account: (typeof DEMO_ACCOUNTS)[number]) => {
    if (!account.email || !account.password) {
      toast.error(`Demo credentials are not configured.`, { duration: 2000 });
      return;
    }

    setDemoLoadingLabel(account.label);
    try {
      const result = await login({ email: account.email, password: account.password });
      if (result?.success) {
        toast.success(`Welcome, demo ${account.label.toLowerCase()}!`, { duration: 2000 });
        close();
      } else {
        toast.error(result?.error ?? `Failed to sign in as demo ${account.label}.`, { duration: 2000 });
      }
    } finally {
      setDemoLoadingLabel(null);
    }
  };

  // Any in-flight auth call disables the rest of the form.
  const isBusy = loginLoading || demoLoadingLabel !== null;

  return (
    <div className="w-full space-y-7 p-8 bg-theme rounded-2xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your RestOS account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <AuthInput
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isBusy}
            {...register("email")}
          />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <AuthInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isBusy}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isBusy}
            >
              <Icon
                icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                className="h-4 w-4"
              />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="text-xs text-destructive">{errors.password?.message}</p>
          </ShowIf>
        </div>

        <Button
          type="submit"
          className="w-full text-white rounded-full"
          loading={loginLoading}
          disabled={isBusy}
          size="lg"
        >
          Sign in
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or try a demo account</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((account) => {
            const isLoading = demoLoadingLabel === account.label;
            return (
              <Button
                key={account.label}
                type="button"
                onClick={() => handleDemoSignIn(account)}
                disabled={isBusy}
                loading={isLoading}
                size="lg"
                className="w-full bg-primary/10 hover:bg-primary/20 text-primary rounded-full border-0"
              >
                {!isLoading && <Icon icon={account.icon} className="h-4 w-4 mr-2" />}
                {account.label}
              </Button>
            );
          })}
        </div>

        <div className="pt-2 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => goTo("sign-up")}
              className="font-medium text-primary hover:underline"
              disabled={isBusy}
            >
              Sign up
            </button>
          </p>
          <button
            type="button"
            onClick={() => goTo("forgot-password")}
            className="text-sm text-primary hover:underline"
            disabled={isBusy}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
