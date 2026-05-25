"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  useAddVoteOnBlogMutation,
  useGetSingleVoteOfUserOnBlogQuery,
  useRemoveVoteOnBlogMutation,
} from "@/redux/featureApi/voteApi";
import { toast } from "sonner";
import { SaveButton } from "@/modules/saves";

export function BlogVoteBar({
  blogId,
  upvotes = 0,
  downvotes = 0,
}: {
  blogId: string;
  upvotes?: number;
  downvotes?: number;
}) {
  const { data: myVote } = useGetSingleVoteOfUserOnBlogQuery(blogId);
  const [addVote] = useAddVoteOnBlogMutation();
  const [removeVote] = useRemoveVoteOnBlogMutation();

  const myVoteType = (myVote as { data?: { voteType?: "up" | "down" } })?.data?.voteType;

  const handleVote = async (type: "up" | "down") => {
    try {
      if (myVoteType === type) await removeVote(blogId).unwrap();
      else await addVote({ blog: blogId, voteType: type }).unwrap();
    } catch (err) {
      const e = err as { data?: { message?: string } };
      toast.error(e?.data?.message ?? "Vote failed.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={myVoteType === "up" ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote("up")}
      >
        <Icon icon="solar:arrow-up-linear" className="h-4 w-4" /> {upvotes}
      </Button>
      <Button
        variant={myVoteType === "down" ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote("down")}
      >
        <Icon icon="solar:arrow-down-linear" className="h-4 w-4" /> {downvotes}
      </Button>
      <SaveButton type="blog" itemId={blogId} variant="default" size="sm" />
    </div>
  );
}
