import { PublicHeader } from "@/components/layouts/PublicHeader";
import { PublicFooter } from "@/components/layouts/PublicFooter";
import { Container } from "@/components/layouts/Container";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-background">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
    </Container>
  );
}
