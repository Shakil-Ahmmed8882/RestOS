import Link from "next/link";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";

const PROMOS = [
  {
    title: "20% off your first order",
    description: "Use code WELCOME20 at checkout — instant savings on any meal.",
    icon: "solar:gift-bold-duotone",
    color: "from-emerald-500 to-teal-600",
    href: "/food",
  },
  {
    title: "Free delivery weekend",
    description: "Saturday & Sunday — zero delivery fees on orders over $20.",
    icon: "solar:delivery-bold-duotone",
    color: "from-violet-500 to-purple-600",
    href: "/food",
  },
  {
    title: "Chef’s pick of the week",
    description: "Hand-curated tasting menu — limited daily quantities.",
    icon: "solar:chef-hat-bold-duotone",
    color: "from-orange-500 to-red-500",
    href: "/menu",
  },
];

export function PromoSection() {
  return (
    <section className="py-12">
      <Container className="grid gap-4 md:grid-cols-3">
        {PROMOS.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.color} p-6 text-white shadow-lg transition hover:shadow-xl`}
          >
            <Icon icon={p.icon} className="mb-3 h-10 w-10" />
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-1 text-sm text-white/80">{p.description}</p>
            <Icon icon="solar:arrow-right-linear" className="absolute bottom-5 right-5 h-5 w-5" />
          </Link>
        ))}
      </Container>
    </section>
  );
}
