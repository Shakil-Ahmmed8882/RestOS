"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { signInSchema, type SignInInput } from "@/modules/auth/schemas/auth.schema";
import { signInWithEmail, signInWithGoogle } from "@/modules/auth/services/firebase-auth.service";
import { useAuthFlow } from "@/modules/auth/hooks/useAuthFlow";
import { USER_ROLE } from "@/constants/roles";
import { DemoRolesGrid } from "@/modules/auth/sections/sign-in/DemoRolesGrid";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { finalize, tryBackendLogin } = useAuthFlow();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInInput) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Signing in…");
    try {
      const cred = await signInWithEmail(data.email, data.password);
      const fbUser = cred.user;
      const name = fbUser.displayName ?? data.email.split("@")[0];
      const synced = await tryBackendLogin({ name, email: fbUser.email ?? data.email });
      if (synced) {
        finalize(synced.user, synced.token);
      } else {
        finalize(
          {
            id: fbUser.uid,
            email: fbUser.email ?? data.email,
            name,
            role: USER_ROLE.USER,
            photoURL: fbUser.photoURL,
          },
          "firebase-only",
        );
      }
      toast.success(`Welcome back, ${name}!`, { id: toastId });
    } catch (err: any) {
      const msg =
        err?.code === "auth/invalid-credential" || err?.code === "auth/wrong-password"
          ? "Invalid email or password."
          : err?.code === "auth/user-not-found"
          ? "No account found with this email."
          : err?.code === "auth/too-many-requests"
          ? "Too many failed attempts. Try again later."
          : err?.message ?? "Sign-in failed.";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Signing in with Google…");
    try {
      const cred = await signInWithGoogle();
      const fbUser = cred.user;
      const synced = await tryBackendLogin({
        name: fbUser.displayName ?? "Google User",
        email: fbUser.email ?? "",
      });
      if (synced) finalize(synced.user, synced.token);
      else
        finalize(
          {
            id: fbUser.uid,
            email: fbUser.email ?? "",
            name: fbUser.displayName ?? "Google User",
            role: USER_ROLE.USER,
            photoURL: fbUser.photoURL,
          },
          "firebase-only",
        );
      toast.success("Signed in!", { id: toastId });
    } catch (err: any) {
      const msg =
        err?.code === "auth/popup-closed-by-user"
          ? "Sign-in cancelled."
          : err?.code === "auth/popup-blocked"
          ? "Popup blocked. Allow popups and try again."
          : err?.message ?? "Google sign-in failed.";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-md space-y-7 px-8 py-10 lg:px-14"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your RestOS account</p>
      </div>

      <DemoRolesGrid disabled={loading} />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or sign in manually</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="pr-10"
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

        <Button type="submit" className="w-full" loading={loading} size="lg">
          Sign in
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn} disabled={loading}>
          <Icon icon="logos:google-icon" className="h-5 w-5" />
          Continue with Google
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Sign up free →
        </Link>
      </p>
    </motion.div>
  );
}
