"use client";

import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";

export function BlogCategoriesSection() {
  return (
    <Card className="flex flex-col items-center gap-3 p-12 text-center">
      <Icon icon="solar:folder-2-bold-duotone" className="h-12 w-12 text-primary" />
      <p className="text-base font-semibold">Blog categories live in the post editor</p>
      <p className="max-w-md text-sm text-muted-foreground">
        Each blog post has a category field; the API exposes them automatically. Dedicated CRUD coming soon.
      </p>
    </Card>
  );
}
