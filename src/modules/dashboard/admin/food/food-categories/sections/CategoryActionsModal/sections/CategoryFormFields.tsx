"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type CategoryFormState = {
  name: string;
  description: string;
  imagePreview: string | null;
  imageFile: File | null;
};

type Props = {
  state: CategoryFormState;
  onChange: (next: Partial<CategoryFormState>) => void;
  nameError?: string;
};

export function CategoryFormFields(props: Props) {
  const { state, onChange, nameError } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () =>
      onChange({ imageFile: file, imagePreview: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl bg-zinc-50/80 dark:bg-white/[0.03] p-4 flex flex-col gap-4 cursor-pointer hover:bg-zinc-100/80 dark:hover:bg-white/[0.05] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {state.imagePreview ? (
          <img
            src={state.imagePreview}
            alt="Preview"
            className="h-40 w-full rounded-lg object-cover object-top flex-shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-lg bg-silk-with-hover flex flex-col items-center justify-center flex-shrink-0">
            <Icon
              icon="solar:cloud-upload-linear"
              className="h-7 w-7 text-zinc-400 dark:text-zinc-500"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Category image
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Click to upload. JPG/PNG/WebP, up to 10MB.
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Name
        </label>
        <Input
          value={state.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Italian"
          className="text-zinc-900 border-none bg-silk-with-hover dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
        />
        {nameError && <p className="text-[11px] text-red-500">{nameError}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Description
        </label>
        <Textarea
          value={state.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          placeholder="Short description for this category"
          className="text-zinc-900 border-none bg-silk-with-hover dark:text-zinc-100"
        />
      </div>
    </div>
  );
}
