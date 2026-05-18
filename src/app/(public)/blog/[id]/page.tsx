import { BlogDetailsHomeLayout } from "@/modules/blog/details/BlogDetailsHomeLayout";

export const metadata = { title: "Article — RestOS" };

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailsHomeLayout blogId={id} />;
}
