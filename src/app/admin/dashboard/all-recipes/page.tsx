import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AllRecipesSection } from "@/modules/dashboard/admin/sections/AllRecipesSection";

export default function Page() {
  return (
    <>
      <PageHeader
        title="All recipes"
        description="Manage every recipe in the catalog."
        action={
          <Button asChild>
            <Link href="/admin/dashboard/add-recipe">
              <Icon icon="solar:add-circle-linear" className="h-4 w-4" /> Add recipe
            </Link>
          </Button>
        }
      />
      <AllRecipesSection />
    </>
  );
}
