"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { ShowIf } from "@/components/common/ShowIf";
import {
  useAddCommentOnBlogMutation,
  useDeleteCommentOnBlogMutation,
  useGetAllCommentsOnSingleBlogQuery,
} from "@/redux/featureApi/commentApi";
import { useAppSelector } from "@/redux/hooks";
import type { BlogComment } from "@/modules/blog/types/blog.types";

export function BlogCommentSection({ blogId }: { blogId: string }) {
  const [text, setText] = useState("");
  const user = useAppSelector((s) => s.auth.user);
  const { data, isLoading } = useGetAllCommentsOnSingleBlogQuery(blogId);
  const comments = (data ?? []) as BlogComment[];
  const [addComment, { isLoading: posting }] = useAddCommentOnBlogMutation();
  const [deleteComment] = useDeleteCommentOnBlogMutation();

  const handlePost = async () => {
    if (!text.trim()) return;
    if (!user) {
      toast.error("Please sign in to comment.");
      return;
    }
    const optimistic: BlogComment = {
      _id: `tmp-${Date.now()}`,
      comment: text.trim(),
      user: { name: user.name ?? "You", photo: user.photoURL ?? null },
      blog: blogId,
      createdAt: new Date().toISOString(),
      _pending: true,
    };
    try {
      await addComment({ blog: blogId, comment: text.trim(), _optimisticEntry: optimistic } as any).unwrap();
      setText("");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to post comment.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

      <Card className="space-y-3 p-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={user ? "Share your thoughts…" : "Sign in to comment"}
          disabled={!user}
        />
        <div className="flex justify-end">
          <Button onClick={handlePost} loading={posting} disabled={!text.trim() || !user}>
            <Icon icon="solar:plain-2-linear" className="h-4 w-4" /> Post
          </Button>
        </div>
      </Card>

      <CustomSuspense
        isLoading={isLoading}
        fallback={
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <ShowIf condition={comments.length > 0} fallback={<p className="text-sm text-muted-foreground">No comments yet — be the first.</p>}>
          <div className="space-y-3">
            {comments.map((c) => {
              const cu = typeof c?.user === "object" ? c.user : null;
              return (
              <Card key={c._id} className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={cu?.photo ?? undefined} alt={cu?.name} />
                      <AvatarFallback>{cu?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{cu?.name ?? "User"}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                      </p>
                    </div>
                  </div>
                  {user?.email && cu?.email === user.email ? (
                    <Button variant="ghost" size="icon" onClick={() => deleteComment({ id: c._id, blogId })}>
                      <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
                    </Button>
                  ) : null}
                </div>
                <p className={`text-sm ${c._pending ? "opacity-60" : ""}`}>{c.comment}</p>
              </Card>
              );
            })}
          </div>
        </ShowIf>
      </CustomSuspense>
    </div>
  );
}
