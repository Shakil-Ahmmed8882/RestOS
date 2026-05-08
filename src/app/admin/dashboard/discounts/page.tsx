import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader title="Discounts & offers" description="Promotions, coupons, and seasonal deals." />
      <Card className="flex flex-col items-center gap-3 p-12 text-center">
        <Icon icon="solar:tag-price-bold-duotone" className="h-12 w-12 text-primary" />
        <p className="text-base font-semibold">Promo engine coming soon</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Configure percentage discounts, BOGO deals, and limited-time offers — all from one place.
        </p>
      </Card>
    </>
  );
}
