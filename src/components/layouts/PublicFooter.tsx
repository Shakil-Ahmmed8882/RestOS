import Link from "next/link";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";

const SECTIONS = [
  {
    title: "Discover",
    links: [
      { label: "Food", href: "/food" },
      { label: "Recipes", href: "/recipe/new" },
      { label: "Blog", href: "/blog" },
      { label: "Categories", href: "/all-categories" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Sign up", href: "/sign-up" },
      { label: "Dashboard", href: "/user/dashboard" },
      { label: "Saved blogs", href: "/user/dashboard/saved-blogs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Icon icon="solar:chef-hat-bold-duotone" className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">RestOS</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Discover restaurant-grade food, recipes, and stories — all in one place.
          </p>
          <div className="flex gap-2 pt-2">
            {[
              { i: "logos:facebook", h: "#" },
              { i: "logos:instagram-icon", h: "#" },
              { i: "logos:twitter", h: "#" },
              { i: "logos:youtube-icon", h: "#" },
            ].map((s) => (
              <a key={s.i} href={s.h} className="rounded-md bg-background p-2 hover:bg-accent">
                <Icon icon={s.i} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.title} className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{sec.title}</h4>
            <ul className="space-y-2">
              {sec.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-border/60">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} RestOS. All rights reserved.</p>
          <p>Made with ♥ for food lovers.</p>
        </Container>
      </div>
    </footer>
  );
}
