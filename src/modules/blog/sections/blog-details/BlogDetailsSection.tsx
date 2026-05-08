"use client";

import { Container } from "@/components/layouts/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BaseImage } from "@/components/common/BaseImage";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { useGetSingleBlogQuery } from "@/redux/featureApi/blogApi";
import { BlogVoteBar } from "@/modules/blog/sections/blog-details/BlogVoteBar";
import { BlogCommentSection } from "@/modules/blog/sections/blog-details/BlogCommentSection";
import type { BlogItem } from "@/modules/blog/types/blog.types";

export function BlogDetailsSection({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleBlogQuery(id);
  const blog = (data as any)?.data as BlogItem | undefined;

  return (
    <Container className="py-10">
      <CustomSuspense
        isLoading={isLoading}
        fallback={
          <div className="space-y-4">
            <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        }
      >
        {blog ? (
          <article className="mx-auto max-w-3xl space-y-6">
            {blog.image ? (
              <BaseImage
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                containerClassName="aspect-[16/9] w-full rounded-2xl"
              />
            ) : null}
            <div className="space-y-3">
              {blog.category ? <Badge variant="secondary">{blog.category}</Badge> : null}
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{blog.title}</h1>
              <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={blog.author?.photo ?? undefined} alt={blog.author?.name} />
                    <AvatarFallback>{blog.author?.name?.[0]?.toUpperCase() ?? "A"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{blog.author?.name ?? "Anonymous"}</span>
                  <span>·</span>
                  <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                </div>
                <BlogVoteBar blogId={blog._id} upvotes={blog.upvotes} downvotes={blog.downvotes} />
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.content ?? blog.excerpt ?? "" }}
            />
            <BlogCommentSection blogId={blog._id} />
          </article>
        ) : (
          <p className="text-center text-muted-foreground">Article not found.</p>
        )}
      </CustomSuspense>
    </Container>
  );
}
