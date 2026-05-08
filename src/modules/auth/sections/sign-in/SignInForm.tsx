"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useSignIn } from "@/modules/auth/hooks/useSignIn";
import { AuthInput } from "@/modules/auth/components/AuthInput";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

export function SignInForm() {
  const { register, handleSubmit, errors, showPassword, setShowPassword, onSubmit, loginLoading } = useSignIn();
  const { goTo } = useMultipageModalSelector();

  const handleGoogleSignIn = () => {
    // Google OAuth coming soon
  };

  return (
    <div
      className="w-full space-y-7 p-8 bg-white dark:bg-[#121212]  rounded-2xl"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your RestOS account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <AuthInput id="email" type="email" placeholder="you@example.com" {...register("email")} />
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
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"} className="h-4 w-4" />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="text-xs text-destructive">{errors.password?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full text-white rounded-full" loading={loginLoading} size="lg">
          Sign in
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full border-gray-400 rounded-full" size="lg" onClick={handleGoogleSignIn} disabled={loginLoading}>
          <Icon icon="logos:google-icon" className="h-5 w-5" />
          Continue with Google
        </Button>

        <div className="pt-2 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => goTo("sign-up")}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
          <button
            type="button"
            onClick={() => goTo("forgot-password")}
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
