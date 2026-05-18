"use client";

import { useGetSingleBlogQuery } from "@/redux/featureApi/blogApi";
import type { BlogItem } from "@/modules/blog/types/blog.types";

type Props = {
  blogId: string;
};

export function useBlogDetails(props: Props) {
  const { blogId } = props;
  const { data, isLoading, error, refetch } = useGetSingleBlogQuery(blogId, {
    skip: !blogId,
  });

  // `getSingleBlog` returns `{ success, data: Blog }` envelope.
  const blog: BlogItem | undefined =
    ((data as any)?.data as BlogItem | undefined) ?? (data as BlogItem | undefined);

  return { blog, isLoading, error, refetch };
}
