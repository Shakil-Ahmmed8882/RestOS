import React, { useState } from "react";
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

function ActionButtons({ articleId }) {
  const [likeStatus, setLikeStatus] = useState({
    liked: false,
    disliked: false,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookMark, setBookMark] = useState(false);

  const handleLike = () => {
    setLikeStatus({ liked: !likeStatus.liked, disliked: false });
    console.log("Liked article with id:", articleId);
  };

  const handleDislike = () => {
    setLikeStatus({ liked: false, disliked: !likeStatus.disliked });
    console.log("Disliked article with id:", articleId);
  };

  const handleBookmark = () => {
    setBookMark(!isBookMark);
    console.log("Bookmarked article with id:", articleId);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Marked as favorite article with id:", articleId);
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

export default ActionButtons;
