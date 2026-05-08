"use client";

import { useRef, useState } from "react";
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
import { signUpSchema, type SignUpInput } from "@/modules/auth/schemas/auth.schema";
import { signUpWithEmail, updateFirebaseUser } from "@/modules/auth/services/firebase-auth.service";
import { useAuthFlow } from "@/modules/auth/hooks/useAuthFlow";
import { USER_ROLE } from "@/constants/roles";

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/initials/svg?backgroundColor=10b981&textColor=ffffff&seed=";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { finalize, tryBackendRegister } = useAuthFlow();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be smaller than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: SignUpInput) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Creating your account…");
    const photo = photoPreview ?? `${DEFAULT_AVATAR}${encodeURIComponent(data.name)}`;

    try {
      const cred = await signUpWithEmail(data.email, data.password);
      try {
        await updateFirebaseUser(data.name, photo);
      } catch {
        /* non-fatal */
      }

      const synced = await tryBackendRegister({
        name: data.name,
        email: data.email,
        password: data.password,
        photo,
      });

      if (synced) {
        finalize(synced.user, synced.token);
      } else {
        finalize(
          {
            id: cred.user.uid,
            email: data.email,
            name: data.name,
            role: USER_ROLE.USER,
            photoURL: photo,
          },
          "firebase-only",
        );
      }
      toast.success(`Welcome to RestOS, ${data.name}! 🎉`, { id: toastId });
    } catch (err: any) {
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err?.code === "auth/weak-password"
          ? "Password is too weak."
          : err?.code === "auth/invalid-email"
          ? "Please enter a valid email."
          : err?.message ?? "Something went wrong.";
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
      className="mx-auto w-full max-w-md space-y-6 px-8 py-12 lg:px-14"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">Start your RestOS journey today — it&apos;s free.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-800 transition hover:border-primary"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-2xl">📷</div>
            )}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-medium text-primary hover:underline"
          >
            {photoPreview ? "Change photo" : "Upload profile photo (optional)"}
          </button>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          <ShowIf condition={!!errors.name}>
            <p className="text-xs text-destructive">{errors.name?.message}</p>
          </ShowIf>
        </div>

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
              placeholder="Min. 6 characters"
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"} className="h-4 w-4" />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="text-xs text-destructive">{errors.password?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in →
        </Link>
      </p>
      <p className="text-center text-[11px] text-muted-foreground">
        By creating an account you agree to our <span className="underline">Terms</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </motion.div>
  );
}
