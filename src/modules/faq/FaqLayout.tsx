import { Container } from "@/components/layouts/Container";
import { FaqAccordion } from "@/modules/faq/sections/FaqAccordion";

export function FaqLayout() {
  return (
    <Container className="py-14">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Help center</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything you need to know about running and ordering with RestOS.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <FaqAccordion />
      </div>
    </Container>
  );
}
