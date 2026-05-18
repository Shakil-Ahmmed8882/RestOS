import type { TBlogStatus } from "@/modules/dashboard/admin/blogs/types";

type Props = {
  status?: TBlogStatus | string;
};

const STYLE: Record<string, string> = {
  approved: "bg-emerald-500/10 text-emerald-500",
  "test-approved": "bg-sky-500/10 text-sky-500",
  pending: "bg-amber-500/10 text-amber-500",
};

const LABEL: Record<string, string> = {
  approved: "Approved",
  "test-approved": "Test approved",
  pending: "Pending",
};

export function BlogStatusPill(props: Props) {
  const status = props.status ?? "pending";
  const cls = STYLE[status] ?? "bg-zinc-500/10 text-zinc-500";
  const label = LABEL[status] ?? status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
