"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useAddVoteOnBlogMutation, useGetSingleVoteOfUserOnBlogQuery, useRemoveVoteOnBlogMutation } from "@/redux/featureApi/voteApi";
import { useSaveBlogMutation, useUnsaveBlogMutation, useIsBlogSavedQuery } from "@/redux/featureApi/saveApi";
import { toast } from "sonner";

export function BlogVoteBar({ blogId, upvotes = 0, downvotes = 0 }: { blogId: string; upvotes?: number; downvotes?: number }) {
  const { data: myVote } = useGetSingleVoteOfUserOnBlogQuery(blogId);
  const { data: saved } = useIsBlogSavedQuery(blogId);
  const [addVote] = useAddVoteOnBlogMutation();
  const [removeVote] = useRemoveVoteOnBlogMutation();
  const [save] = useSaveBlogMutation();
  const [unsave] = useUnsaveBlogMutation();

  const myVoteType = (myVote as any)?.data?.voteType as "up" | "down" | undefined;
  const isSaved = !!(saved as any)?.data;

  const handleVote = async (type: "up" | "down") => {
    try {
      if (myVoteType === type) await removeVote(blogId).unwrap();
      else await addVote({ blog: blogId, voteType: type }).unwrap();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Vote failed.");
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) await unsave(blogId).unwrap();
      else await save(blogId).unwrap();
      toast.success(isSaved ? "Removed from saved" : "Saved");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Action failed.");
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
      <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={handleSave}>
        <Icon icon={isSaved ? "solar:bookmark-bold" : "solar:bookmark-linear"} className="h-4 w-4" />
        {isSaved ? "Saved" : "Save"}
      </Button>
    </div>
  );
}
