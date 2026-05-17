import { Container } from "@/components/layouts/Container";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { DashboardTopbar } from "@/components/layouts/DashboardTopbar";
import { ADMIN_NAV } from "@/modules/dashboard/admin/AdminSidebarNav";
import {
  GlobalSearchProvider,
  GlobalSearchLayout,
} from "@/modules/shared/global-search";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalSearchProvider>
      <Container>
        <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950">
          <DashboardSidebar brand="Admin" groups={ADMIN_NAV} variant="admin" />
          <div className="flex w-full min-w-0 flex-col">
            <DashboardTopbar title="Admin dashboard" />
            <main className="flex-1 px-6 py-6">{children}</main>
          </div>
        </div>
      </Container>
      <GlobalSearchLayout />
    </GlobalSearchProvider>
  );
}
