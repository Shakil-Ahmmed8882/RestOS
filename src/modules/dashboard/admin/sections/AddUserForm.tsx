"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { AuthInput } from "@/modules/auth/components/AuthInput";
import { useCreateUser } from "@/modules/dashboard/admin/hooks/useCreateUser";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function SelectDropdown(props: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  id: string;
}) {
  const { value, onChange, options, label, id } = props;
  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={id}
            type="button"
            className="w-full px-4 py-2 rounded-full border border-gray-400 bg-white dark:bg-slate-900 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 text-left flex items-center justify-between"
          >
            <span>{selectedLabel}</span>
            <Icon icon="solar:chevron-down-linear" className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px]">
          {options.map((option) => (
            <DropdownMenuItem key={option.value} onSelect={() => onChange(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function AddUserFormBasic() {
  const { register, handleSubmit, errors, showPassword, setShowPassword, photoPreview, fileInputRef, handlePhotoChange, creating } = useCreateUser();
  const { goTo } = useMultipageModalSelector();

  const handleContinue = handleSubmit(() => {
    
  });

  return (
    <div className="w-full space-y-7 p-8 bg-white dark:bg-[#121212] rounded-2xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new user</h1>
        <p className="text-sm text-muted-foreground">Add a new user to the platform</p>
      </div>

      <form  className="space-y-5">
        {/* Photo Upload */}
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div className="flex items-center gap-4">
           
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="border-gray-400 rounded-full w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon icon="solar:upload-linear" className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
               <div className=" rounded-lg bg-muted flex items-center  overflow-hidden  mt-2">
              {photoPreview && (
                <img src={photoPreview} alt="preview" className="h-[100px] w-[100px] rounded-lg object-cover" />
              )}
            </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <AuthInput id="name" type="text" placeholder="John Doe" {...register("name")} />
          <ShowIf condition={!!errors.name}>
            <p className="text-xs text-destructive">{errors.name?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <AuthInput id="email" type="email" placeholder="user@example.com" {...register("email")} />
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

        <Button onClick={handleContinue} loading={creating} className="w-full rounded-full text-white" disabled={creating} size="lg">
          {creating ? "Creating..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
