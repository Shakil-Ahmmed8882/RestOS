"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateMyProfileMutation } from "@/redux/featureApi/profileApi";
import type { ProfileEditableFields, ProfileUser } from "../types";

type FormShape = {
  name: string;
  bio: string;
  location: string;
  contactNumber: string;
  diningFrequency: ProfileEditableFields["diningFrequency"];
  instagram: string;
  facebook: string;
  twitter: string;
};

type Args = {
  user: ProfileUser | null;
  onSuccess?: () => void;
};

function buildDefaults(user: ProfileUser | null): FormShape {
  return {
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    location: user?.location ?? "",
    contactNumber: user?.contactNumber ?? "",
    diningFrequency: user?.diningFrequency ?? "Occasionally",
    instagram: user?.socialMedia?.instagram ?? "",
    facebook: user?.socialMedia?.facebook ?? "",
    twitter: user?.socialMedia?.twitter ?? "",
  };
}

// Returns only the fields the user actually touched. Unchanged fields are
// omitted entirely so the API leaves them untouched on its side.
function pickDirty(values: FormShape, defaults: FormShape, dirtyFields: Record<string, unknown>) {
  const out: Partial<FormShape> = {};
  (Object.keys(values) as (keyof FormShape)[]).forEach((key) => {
    if (dirtyFields[key]) out[key] = values[key] as any;
  });
  return out;
}

function buildSocialMedia(dirty: Partial<FormShape>, user: ProfileUser | null) {
  const touched = ["instagram", "facebook", "twitter"].some(
    (k) => k in dirty,
  );
  if (!touched) return undefined;
  return {
    instagram: dirty.instagram ?? user?.socialMedia?.instagram ?? "",
    facebook: dirty.facebook ?? user?.socialMedia?.facebook ?? "",
    twitter: dirty.twitter ?? user?.socialMedia?.twitter ?? "",
  };
}

export function useEditProfile(args: Args) {
  const { user, onSuccess } = args;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading: saving }] = useUpdateMyProfileMutation();

  const form = useForm<FormShape>({ defaultValues: buildDefaults(user) });

  // Re-sync only when the *identity* changes (e.g. after refetch the user id is
  // the same, but we still want to reset dirty flags after a save round-trip).
  useEffect(() => {
    if (!user) return;
    form.reset(buildDefaults(user));
    setPhotoPreview(null);
    setPhotoFile(null);
  }, [user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be smaller than 5MB.");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isDirty = form.formState.isDirty || !!photoFile;

  const onSubmit = form.handleSubmit(async (values) => {
    // Nothing to send — close the modal without pinging the server.
    if (!isDirty) {
      onSuccess?.();
      return;
    }

    const defaults = buildDefaults(user);
    const dirty = pickDirty(values, defaults, form.formState.dirtyFields);
    const socialMedia = buildSocialMedia(dirty, user);

    try {
      if (photoFile) {
        const fd = new FormData();
        if ("name" in dirty) fd.append("name", dirty.name ?? "");
        if ("bio" in dirty) fd.append("bio", dirty.bio ?? "");
        if ("location" in dirty) fd.append("location", dirty.location ?? "");
        if ("contactNumber" in dirty) fd.append("contactNumber", dirty.contactNumber ?? "");
        if ("diningFrequency" in dirty && dirty.diningFrequency) {
          fd.append("diningFrequency", dirty.diningFrequency);
        }
        if (socialMedia) fd.append("socialMedia", JSON.stringify(socialMedia));
        fd.append("photo", photoFile);
        await updateProfile(fd).unwrap();
      } else {
        const body: Record<string, unknown> = { ...dirty };
        delete body.instagram;
        delete body.facebook;
        delete body.twitter;
        if (socialMedia) body.socialMedia = socialMedia;
        await updateProfile(body).unwrap();
      }

      toast.success("Profile updated");
      clearPhoto();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update profile");
    }
  });

  return {
    form,
    onSubmit,
    saving,
    photoPreview,
    photoFile,
    fileInputRef,
    handlePhotoChange,
    clearPhoto,
    isDirty,
  };
}
