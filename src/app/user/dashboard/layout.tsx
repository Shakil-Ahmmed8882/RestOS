import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { DashboardTopbar } from "@/components/layouts/DashboardTopbar";
import { USER_NAV } from "@/modules/dashboard/user/UserSidebarNav";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <DashboardSidebar brand="My account" groups={USER_NAV} variant="user" />
      <div className="flex w-full min-w-0 flex-col">
        <DashboardTopbar title="My dashboard" />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
