import { PublicLayoutWrapper } from "@/components/layouts/PublicLayoutWrapper";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayoutWrapper>{children}</PublicLayoutWrapper>;
}
