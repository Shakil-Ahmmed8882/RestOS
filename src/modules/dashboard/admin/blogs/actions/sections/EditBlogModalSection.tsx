"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleBlogQuery } from "@/redux/featureApi/blogApi";
import { useOptimisticUpdateBlog } from "../hooks/useOptimisticUpdateBlog";
import { useBlogActionsSelector } from "../context/BlogActionsContext";
import type { TBlog, TBlogStatus } from "@/modules/dashboard/admin/blogs/types";

type FormValues = {
  title: string;
  category: string;
  tagsCSV: string;
  description: string;
  status: TBlogStatus;
};

type Props = {
  blogId: string;
};

function EditFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-7 w-32 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-20 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
          <div className="h-10 w-full bg-zinc-200/70 dark:bg-zinc-800 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function EditBlogModalSection(props: Props) {
  const { blogId } = props;
  const { close } = useBlogActionsSelector();
  const { data, isLoading } = useGetSingleBlogQuery(blogId);
  const blog: TBlog | undefined = data?.data ?? data;

  const { run, isLoading: saving } = useOptimisticUpdateBlog();

  const { control, register, handleSubmit, reset, formState: { errors } } =
    useForm<FormValues>({
      defaultValues: {
        title: "",
        category: "",
        tagsCSV: "",
        description: "",
        status: "pending",
      },
    });

  useEffect(() => {
    if (!blog) return;
    reset({
      title: blog.title ?? "",
      category: blog.category ?? "",
      tagsCSV: (blog.tags ?? []).join(", "),
      description: blog.description ?? "",
      status: (blog.status as TBlogStatus) ?? "pending",
    });
  }, [blog, reset]);

  const onSubmit = async (values: FormValues) => {
    const tags = values.tagsCSV
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const ok = await run({
      blogId,
      payload: {
        title: values.title,
        category: values.category,
        description: values.description,
        status: values.status,
        tags,
      },
    });
    if (ok) close();
  };

  if (isLoading || !blog) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-5">Edit blog</h2>
        <EditFormSkeleton />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Edit blog</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Image cannot be changed after creation.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Title</label>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Blog title"
        />
        {errors.title && (
          <p className="text-[11px] text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Category
          </label>
          <Input
            {...register("category", { required: "Category is required" })}
            placeholder="Recipes"
          />
          {errors.category && (
            <p className="text-[11px] text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full h-10 rounded-md bg-background border border-zinc-200 dark:border-zinc-800 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="test-approved">Test approved</option>
              </select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Tags (comma separated)
        </label>
        <Input
          {...register("tagsCSV")}
          placeholder="cooking, italian, healthy"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Description
        </label>
        <Textarea
          {...register("description")}
          rows={4}
          placeholder="Short description..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={saving}
          className="rounded-full"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="rounded-full text-white min-w-[110px]"
        >
          {saving ? (
            <span className="inline-flex items-center gap-2">
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Saving
            </span>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  );
}
