import { Container } from "@/components/layouts/Container";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { DashboardTopbar } from "@/components/layouts/DashboardTopbar";
import { ADMIN_NAV } from "@/modules/dashboard/admin/AdminSidebarNav";
import { USER_NAV } from "@/modules/dashboard/user/UserSidebarNav";
import {
  GlobalSearchProvider,
  GlobalSearchLayout,
} from "@/modules/shared/global-search";

type Props = {children: React.ReactNode;};
export default function UserDashboardLayout({children}: Props) {
  return (
    <GlobalSearchProvider>
      <Container>
        <div className="flex min-h-screen bg-theme">
          <DashboardSidebar brand="User" groups={USER_NAV} variant="user" />
          <div className="flex w-full min-w-0 flex-col">
            <DashboardTopbar title="User dashboard" />
            <main className="flex-1 px-6 py-6">{children}</main>
          </div>
        </div>
      </Container>
      <GlobalSearchLayout />
    </GlobalSearchProvider>
  );
}
