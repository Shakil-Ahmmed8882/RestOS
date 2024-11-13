import React, { useEffect, useState } from "react";
import { BookMarkIcon, MarkFavoriteIcon } from "../../../../assets/icons/Icons";
import {
  BookedmarkIcon,
  DisLikedIcon,
  DisLikeIcon,
  LikedIcon,
  LikeIcon,
  MarkedFavorite,
} from "../../../../assets/icons";
import ToggleIconButton from "./ToggleIconButton";
import {
  useAddVoteOnBlogMutation,
  useGetSingleVoteOfUserOnBlogQuery,
  useRemoveVoteOnBlogMutation,
} from "../../../../redux/features/vote/vote.api";
import {
  useIsBlogSavedQuery,
  useSaveBlogMutation,
  useUnsaveBlogMutation,
} from "../../../../redux/features/save/save.blog.api";
import ActionButtonSkeleton from "./ActionButtonSkeleton";

function BlogActionButtons({ blogId, blog }) {
  // ============== API ===============
  //UPVOTE
  const { data } = useGetSingleVoteOfUserOnBlogQuery(blogId);
  const [addVote, { data: addedVoteData }] = useAddVoteOnBlogMutation();
  const [removeVote] = useRemoveVoteOnBlogMutation();

  // BOOKMARK (SAVE) BLOG
  const [saveBlog] = useSaveBlogMutation();
  const [unsaveBlog] = useUnsaveBlogMutation();
  const { data: isSavedBlogData } = useIsBlogSavedQuery(blogId);

  const isBlogSaved = isSavedBlogData?.data?.isSaved;
  const voteType = data?.data?.voteType;

  // ============== STATE MANAGEMENT ===========
  const [likeStatus, setLikeStatus] = useState({
    liked: false,
    disliked: voteType === "downvote",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookMark, setBookMark] = useState(isBlogSaved);

  // Set initial like/dislike , save/unsave
  // status based on fetched data
  useEffect(() => {
    if (voteType === "upvote") {
      setLikeStatus({ liked: true, disliked: false });
    } else if (voteType === "downvote") {
      setLikeStatus({ liked: false, disliked: true });
    }
    if (isBlogSaved) {
      setBookMark(isBlogSaved);
    } else {
      setBookMark(isBlogSaved);
    }
  }, [data, isSavedBlogData]);

  // ================= HANDLERS =================

  // VOTE LIKE
  const handleLike = async () => {
    setLikeStatus({ liked: !likeStatus.liked, disliked: false });
    try {
      // remove or add like
      if (!likeStatus.liked == false) {
        await removeVote(blogId);
      } else {
        const voteData = {
          blog: blogId,
          voteType: "upvote",
        };
        const res = await addVote(voteData);
        console.log({ res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    setLikeStatus({ liked: false, disliked: !likeStatus.disliked });

    try {
      // remove or add dislike
      if (!likeStatus.disliked == false) {
        await removeVote(blogId);
      } else {
        const voteData = {
          blog: blogId,
          voteType: "downvote",
        };
        const res = await addVote(voteData);
        console.log({ res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    setBookMark(!isBookMark);

    try {
      if (isBlogSaved) {
        const res = await unsaveBlog(blogId);
        console.log("unsave", res);
      } else {
        const res = await saveBlog(blogId);
        console.log("save", res);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Marked as favorite article with id:", blogId);
  };

  return (
    <div className="flex items-center gap-3 py-3">
      {/* like and dislik */}

      <ToggleIconButton
        defaultIcon={LikeIcon}
        activeIcon={LikedIcon}
        isActive={likeStatus.liked}
        onClick={handleLike}
      />
      {/* dislik */}
      <ToggleIconButton
        defaultIcon={DisLikeIcon}
        activeIcon={DisLikedIcon}
        isActive={likeStatus.disliked}
        onClick={handleDislike}
      />
      {/* Bookmark */}
      <ToggleIconButton
        defaultIcon={BookMarkIcon}
        activeIcon={BookedmarkIcon}
        isActive={isBookMark}
        onClick={handleBookmark}
        sizeClass="size-[21px]"
      />
      {/* Favorite */}
      <ToggleIconButton
        defaultIcon={MarkFavoriteIcon}
        activeIcon={MarkedFavorite}
        isActive={isFavorite}
        onClick={handleFavorite}
      />
    </div>
  );
}

export default BlogActionButtons;
