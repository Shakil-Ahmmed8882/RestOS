"use client";

import { Icon } from "@iconify/react";
import { BaseInput, BaseTextarea } from "@/components/rest-os-ui/forms";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { useCreateBlog } from "../hooks/useCreateBlog";

type Props = {
  onSuccess?: () => void;
};

export function CreateBlogModalSection(props: Props) {
  const { close } = useMultipageModalSelector();
  const {
    state,
    update,
    fileInputRef,
    handleFile,
    clearImage,
    handleSubmit,
    submitting,
    error,
  } = useCreateBlog(() => {
    props.onSuccess?.();
    close();
  });

  return (
    <div className="space-y-5 text-foreground bg-theme p-6 rounded-2xl ">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Write a story
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          New posts go to an admin for review before they're public.
        </p>
      </div>

      {/* Cover image */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl bg-silk-with-hover overflow-hidden cursor-pointer transition-colors"
      >
        {state.preview ? (
          <div className="relative">
            <img
              src={state.preview}
              alt="cover preview"
              className="h-52 w-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              aria-label="Remove cover"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/70"
            >
              <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="h-52 flex flex-col items-center justify-center gap-2 text-center px-4">
            <Icon
              icon="solar:cloud-upload-linear"
              className="h-7 w-7 text-zinc-400 dark:text-zinc-500"
            />
            <p className="text-sm font-medium text-foreground">
              Click to upload a cover
            </p>
            <p className="text-xs text-muted-foreground">
              JPG / PNG / WebP — up to 5 MB
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <Field label="Title">
          <BaseInput
            value={state.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="A clear, compelling headline"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category">
            <BaseInput
              value={state.category}
              onChange={(e) => update({ category: e.target.value })}
              placeholder="Recipes, Reviews, Stories…"
            />
          </Field>
          <Field label="Tags (comma separated)">
            <BaseInput
              value={state.tagsCSV}
              onChange={(e) => update({ tagsCSV: e.target.value })}
              placeholder="italian, dinner, easy"
            />
          </Field>
        </div>

        <Field label="Description">
          <BaseTextarea
            value={state.description}
            onChange={(e) => update({ description: e.target.value })}
            rows={4}
            placeholder="What's the post about?"
          />
        </Field>

        <Field label="Steps (one per line — optional)">
          <BaseTextarea
            value={state.instructionsLines}
            onChange={(e) => update({ instructionsLines: e.target.value })}
            rows={4}
            placeholder={"Boil water\nAdd pasta\nServe hot"}
          />
        </Field>
      </div>

      {error && (
        <div className="rounded-xl bg-primary/5 text-primary text-xs px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        <button
          type="button"
          onClick={close}
          disabled={submitting}
          className="h-11 px-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => void handleSubmit()}
          disabled={submitting}
          className="h-11 px-6 rounded-full bg-primary text-white text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60 shadow-sm shadow-primary/30"
        >
          {submitting ? (
            <>
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Submitting…
            </>
          ) : (
            <>
              <Icon icon="solar:upload-minimalistic-bold" className="h-4 w-4" />
              Submit for review
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>
      {children}
    </div>
  );
}
