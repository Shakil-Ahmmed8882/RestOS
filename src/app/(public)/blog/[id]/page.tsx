import { BlogDetailsSection } from "@/modules/blog/sections/blog-details/BlogDetailsSection";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogDetailsSection id={id} />;
}
