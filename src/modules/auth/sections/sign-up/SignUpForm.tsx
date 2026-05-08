"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useSignUp } from "@/modules/auth/hooks/useSignUp";

export function SignUpForm() {
  const { register, handleSubmit, errors, showPassword, setShowPassword, photoPreview, fileInputRef, handlePhotoChange, onSubmit, registerLoading } = useSignUp();

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">Start your RestOS journey today — it&apos;s free.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} className="placeholder:text-gray-400" />
          <ShowIf condition={!!errors.name}>
            <p className="text-xs text-destructive">{errors.name?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className="placeholder:text-gray-400" />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="photo">Profile Photo (optional)</Label>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-input" />

          {photoPreview ? (
            <div className="space-y-2">
              <div className="relative inline-block">
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="h-32 w-32 rounded-lg object-cover border border-gray-200 dark:border-gray-800"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-primary hover:underline"
              >
                Change photo
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800 px-4 py-6 transition hover:border-primary hover:bg-muted"
            >
              <Icon icon="solar:cloud-upload-linear" className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Upload photo</span>
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              {...register("password")}
              className="placeholder:text-gray-400"
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

        <Button type="submit" className="w-full text-white" size="lg" loading={registerLoading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-[11px] text-muted-foreground">
        By creating an account you agree to our <span className="underline">Terms</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
}
