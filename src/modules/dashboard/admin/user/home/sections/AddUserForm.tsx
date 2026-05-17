"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { AuthInput } from "@/modules/auth/components/AuthInput";

import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { useCreateUser, UseCreateUserCallbacks } from "../hooks/useCreateUser";

interface Props {
  /** Page id to navigate to after a successful create (inside MultipageModal). */
  successPageId?: string;
  /** Lifecycle hooks — parent splices the new user into its local list. */
  callbacks?: UseCreateUserCallbacks;
}

export function AddUserForm({ successPageId = "add-user-success", callbacks }: Props) {
  const { goTo } = useMultipageModalSelector();

  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    photoPreview,
    fileInputRef,
    handlePhotoChange,
    onSubmit,
    creating,
  } = useCreateUser({
    onCreated: callbacks?.onCreated,
    onSuccess: () => {
      callbacks?.onSuccess?.();
      goTo(successPageId);
    },
  });

  return (
    <div className="w-full bg-theme rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/[0.06]">
      {/* Header */}
      <div className="relative flex flex-col items-center pt-10 pb-8 px-8 bg-gradient-to-b from-gray-50 to-white dark:from-white/[0.03] dark:to-transparent border-b border-gray-100 dark:border-white/[0.06]">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-150 opacity-60" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 border-2 border-primary/20 dark:border-primary/30 flex items-center justify-center shadow-lg">
            <Icon icon="solar:user-plus-rounded-bold-duotone" className="h-9 w-9 text-primary/80" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Create New User
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new member to your platform
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7 space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </Label>
          <AuthInput id="name" type="text" placeholder="John Doe" {...register("name")} />
          <ShowIf condition={!!errors.name}>
            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
              <Icon icon="solar:danger-circle-linear" className="h-3.5 w-3.5 flex-shrink-0" />
              {errors.name?.message}
            </p>
          </ShowIf>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </Label>
          <AuthInput
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />
          <ShowIf condition={!!errors.email}>
            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
              <Icon icon="solar:danger-circle-linear" className="h-3.5 w-3.5 flex-shrink-0" />
              {errors.email?.message}
            </p>
          </ShowIf>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </Label>
          <div className="relative">
            <AuthInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon
                icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                className="h-4 w-4"
              />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
              <Icon icon="solar:danger-circle-linear" className="h-3.5 w-3.5 flex-shrink-0" />
              {errors.password?.message}
            </p>
          </ShowIf>
        </div>

        {/* Photo Upload */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Photo
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {photoPreview ? (
            <div className="relative group w-full rounded-xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.03]">
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-60 object-cover object-top group-hover:translate-y-[-2px] transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-gray-800 text-xs font-medium hover:bg-white transition-colors"
                >
                  <Icon icon="solar:pen-linear" className="h-3.5 w-3.5" />
                  Change
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-gray-200 dark:border-white/[0.08] bg-gray-50/50 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-primary/[0.02] dark:hover:border-primary/30 transition-all duration-200 py-7 flex flex-col items-center justify-center gap-2.5 group"
            >
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/[0.05] group-hover:bg-primary/10 dark:group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Icon
                  icon="solar:cloud-upload-linear"
                  className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Click to upload photo
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </button>
          )}
        </div>

        {/* Submit */}
        <div className="pt-1">
          <Button
            type="submit"
            loading={creating}
            disabled={creating}
            className="w-full h-11 rounded-xl font-medium text-white transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-90 active:scale-[0.99]"
            size="lg"
          >
            {!creating && (
              <Icon icon="solar:user-plus-rounded-linear" className="h-4 w-4 mr-2" />
            )}
            {creating ? "Creating user..." : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
}
