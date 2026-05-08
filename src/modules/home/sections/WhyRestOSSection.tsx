import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Card } from "@/components/ui/card";

const FEATURES = [
  { icon: "solar:bolt-bold-duotone", title: "Lightning fast", description: "30-minute delivery from local kitchens." },
  { icon: "solar:leaf-bold-duotone", title: "Fresh ingredients", description: "Sourced daily from trusted local farms." },
  { icon: "solar:medal-ribbon-bold-duotone", title: "Top-rated chefs", description: "Hand-picked menus by award-winning cooks." },
  { icon: "solar:shield-check-bold-duotone", title: "Safe & secure", description: "Tracked deliveries and protected payments." },
];

export function WhyRestOSSection() {
  return (
    <section className="py-12">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Why people choose RestOS</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We obsess over every order so you can enjoy every bite — guaranteed.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-6">
              <Icon icon={f.icon} className="mb-3 h-10 w-10 text-primary" />
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
