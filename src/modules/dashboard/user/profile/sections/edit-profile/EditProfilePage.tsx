"use client";

import { Icon } from "@iconify/react";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { BaseInput, BaseTextarea } from "@/components/rest-os-ui/forms";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { BaseAvatar } from "@/components/rest-os-ui/images/variations/avatar/BaseAvatar";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import { useEditProfile } from "../../hooks/useEditProfile";
import type { ProfileUser } from "../../types";

type Props = {
  user: ProfileUser;
  onClose: () => void;
};

export function EditProfilePage(props: Props) {
  const { user, onClose } = props;
  const { goTo } = useMultipageModalSelector();

  const {
    form,
    onSubmit,
    saving,
    photoPreview,
    fileInputRef,
    handlePhotoChange,
    clearPhoto,
    isDirty,
  } = useEditProfile({ user, onSuccess: onClose });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Edit profile</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            All fields optional — only changes are sent.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-8 rounded-full inline-flex items-center justify-center text-muted-foreground hover:bg-silk-with-hover transition-colors cursor-pointer"
          aria-label="Close"
        >
          <Icon icon="solar:close-circle-linear" className="size-5" />
        </button>
      </header>

      {/* Avatar */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Preview"
              className="size-16 rounded-full object-cover ring-4 ring-white dark:ring-zinc-900"
            />
          ) : (
            <BaseAvatar
              src={withCacheBust(user?.photo, user?.updatedAt)}
              name={user?.name}
              size="xl"
              className="!size-16"
              ring
            />
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full bg-primary text-white inline-flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors cursor-pointer ring-2 ring-white dark:ring-zinc-900"
            aria-label="Change photo"
          >
            <Icon icon="solar:camera-linear" className="size-3" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{user?.name ?? "Your name"}</p>
          <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
          <ShowIf condition={!!photoPreview}>
            <button
              type="button"
              onClick={clearPhoto}
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors mt-0.5 cursor-pointer"
            >
              Remove new photo
            </button>
          </ShowIf>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <Field label="Name">
          <BaseInput placeholder="Your name" {...form.register("name")} />
        </Field>
        <Field label="Location">
          <BaseInput placeholder="City, country" {...form.register("location")} />
        </Field>
        <Field label="Contact number" className="sm:col-span-2">
          <BaseInput placeholder="+1 555 000 0000" {...form.register("contactNumber")} />
        </Field>
        <Field label="Bio" className="sm:col-span-2">
          <BaseTextarea
            rows={2}
            placeholder="Tell people about yourself"
            maxLength={500}
            {...form.register("bio")}
          />
        </Field>
        <Field label="Dining frequency" className="sm:col-span-2">
          <select
            {...form.register("diningFrequency")}
            className="w-full h-11 px-3.5 rounded-xl bg-silk-with-hover text-sm text-zinc-900 dark:text-zinc-100 border-0 outline-none focus:ring-0"
          >
            <option value="Rarely">Rarely</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Frequently">Frequently</option>
          </select>
        </Field>
      </div>

      {/* Social */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Social links
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <SocialField icon="ri:instagram-line" label="Instagram" {...form.register("instagram")} />
          <SocialField icon="ri:facebook-fill" label="Facebook" {...form.register("facebook")} />
          <SocialField icon="ri:twitter-x-line" label="Twitter / X" {...form.register("twitter")} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo("preferences")}
        className="w-full rounded-xl bg-silk-with-hover px-3.5 py-2.5 flex items-center justify-between hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 text-left">
          <span className="size-8 rounded-lg bg-primary/10 inline-flex items-center justify-center text-primary">
            <Icon icon="solar:tuning-2-linear" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">Food preferences</p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Cuisines, diet, payment methods
            </p>
          </div>
        </div>
        <Icon icon="solar:arrow-right-linear" className="size-4 text-muted-foreground" />
      </button>

      <div className="flex items-center justify-between gap-2 pt-1">
        <ShowIf condition={isDirty}>
          <p className="text-[11px] text-muted-foreground">Unsaved changes</p>
        </ShowIf>
        <div className="ml-auto flex items-center gap-2">
          <BaseButton
            intent="ghost"
            size="sm"
            className="rounded-full px-4"
            type="button"
            onClick={onClose}
          >
            Cancel
          </BaseButton>
          <BaseButton
            intent="primary"
            size="sm"
            className="rounded-full px-5"
            type="submit"
            isLoading={saving}
            disabled={!isDirty}
          >
            Save
          </BaseButton>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1 ${className ?? ""}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function withCacheBust(src?: string, version?: string): string | undefined {
  if (!src || !version) return src;
  const v = encodeURIComponent(version);
  return src.includes("?") ? `${src}&v=${v}` : `${src}?v=${v}`;
}

const SocialField = (
  props: { icon: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>,
) => {
  const { icon, label, ...rest } = props;
  return (
    <div className="relative">
      <Icon
        icon={icon}
        className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <BaseInput placeholder={label} {...rest} className="pl-9" />
    </div>
  );
};
