import { Container } from "@/components/layouts/Container";

export function FoodHeroSection() {
  return (
    <section className="border-b bg-gradient-to-br from-primary/5 via-background to-background py-12">
      <Container>
        <p className="text-sm font-medium text-primary">Menu</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Find your next favourite dish</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Hand-picked, restaurant-grade meals — searchable, filterable, and ready to deliver.
        </p>
      </Container>
    </section>
  );
}
