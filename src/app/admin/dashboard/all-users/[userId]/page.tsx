import { UserDetailSection } from "@/modules/dashboard/admin/user/sections/UserDetailSection";

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function UserDetailPage(props: Props) {
  const params = await props.params;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">User Details</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage user information</p>
        </div>
      </div>
      <UserDetailSection userId={params.userId} />
    </>
  );
}
