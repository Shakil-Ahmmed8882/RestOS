import { BlogDetailsSection } from "@/modules/blog/sections/blog-details/BlogDetailsSection";

export default function Page({ params }: { params: { id: string } }) {
  return <BlogDetailsSection id={params.id} />;
}
