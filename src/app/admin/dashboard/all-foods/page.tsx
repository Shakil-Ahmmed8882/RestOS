import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AllFoodsSection } from "@/modules/dashboard/admin/sections/AllFoodsSection";

export default function Page() {
  return (
    <>
      <PageHeader
        title="All foods"
        description="Manage menu items — edit, hide, or remove dishes."
        action={
          <Button asChild>
            <Link href="/admin/dashboard/add-food">
              <Icon icon="solar:add-circle-linear" className="h-4 w-4" /> Add food
            </Link>
          </Button>
        }
      />
      <AllFoodsSection />
    </>
  );
}
