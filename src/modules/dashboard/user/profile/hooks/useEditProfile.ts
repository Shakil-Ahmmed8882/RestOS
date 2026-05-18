"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateMyProfileMutation } from "@/redux/featureApi/profileApi";
import type { ProfileEditableFields, ProfileUser } from "../types";

type FormShape = {
  name?: string;
  bio?: string;
  location?: string;
  contactNumber?: string;
  diningFrequency?: ProfileEditableFields["diningFrequency"];
  instagram?: string;
  facebook?: string;
  twitter?: string;
};

type Args = {
  user: ProfileUser | null;
  onSuccess?: () => void;
};

export function useEditProfile(args: Args) {
  const { user, onSuccess } = args;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading: saving }] = useUpdateMyProfileMutation();

  const form = useForm<FormShape>({
    defaultValues: {
      name: user?.name ?? "",
      bio: user?.bio ?? "",
      location: user?.location ?? "",
      contactNumber: user?.contactNumber ?? "",
      diningFrequency: user?.diningFrequency ?? "Occasionally",
      instagram: user?.socialMedia?.instagram ?? "",
      facebook: user?.socialMedia?.facebook ?? "",
      twitter: user?.socialMedia?.twitter ?? "",
    },
  });

  // Re-sync form when the user prop changes (after a save round-trip).
  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user?.name ?? "",
      bio: user?.bio ?? "",
      location: user?.location ?? "",
      contactNumber: user?.contactNumber ?? "",
      diningFrequency: user?.diningFrequency ?? "Occasionally",
      instagram: user?.socialMedia?.instagram ?? "",
      facebook: user?.socialMedia?.facebook ?? "",
      twitter: user?.socialMedia?.twitter ?? "",
    });
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

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      // Use multipart only when uploading a new avatar; JSON otherwise.
      if (photoFile) {
        const fd = new FormData();
        if (values.name) fd.append("name", values.name);
        if (values.bio !== undefined) fd.append("bio", values.bio);
        if (values.location !== undefined) fd.append("location", values.location);
        if (values.contactNumber !== undefined) fd.append("contactNumber", values.contactNumber);
        if (values.diningFrequency) fd.append("diningFrequency", values.diningFrequency);
        fd.append(
          "socialMedia",
          JSON.stringify({
            instagram: values.instagram ?? "",
            facebook: values.facebook ?? "",
            twitter: values.twitter ?? "",
          }),
        );
        fd.append("photo", photoFile);
        await updateProfile(fd).unwrap();
      } else {
        await updateProfile({
          name: values.name,
          bio: values.bio,
          location: values.location,
          contactNumber: values.contactNumber,
          diningFrequency: values.diningFrequency,
          socialMedia: {
            instagram: values.instagram ?? "",
            facebook: values.facebook ?? "",
            twitter: values.twitter ?? "",
          },
        } as Record<string, unknown>).unwrap();
      }

      toast.success("Profile updated");
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
    fileInputRef,
    handlePhotoChange,
  };
}
