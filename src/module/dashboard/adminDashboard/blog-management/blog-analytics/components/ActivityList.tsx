// import React from "react";
// import ActivityItem from "./ActivityItem";

// export default function ActivityList({ data }) {
//   const categorizedData = {
//     blog: data.filter((item) => item.actionType === "blog"),
//     comment: data.filter((item) => item.actionType === "comment"),
//     upvote: data.filter((item) => item.actionType === "upvote"),
//     downvote: data.filter((item) => item.actionType === "downvote"),
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {Object.keys(categorizedData).map((key) => (
//         <div key={key}>
//           <h3 className="font-bold text-xl mb-4 capitalize">{key}</h3>
//           {categorizedData[key].map((activity, index) => (
//             <ActivityItem key={index} activity={activity} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }



import React from "react";
import BlogActivity from "./activity/BlogActivity";
import CommentActivity from "./activity/CommentActivity";
import UpvoteActivity from "./activity/UpvoteActivity";
import DownvoteActivity from "./activity/DownvoteActivity";

export default function ActivityList({ data }) {
  const categorizedData = {
    blog: data.filter((item) => item.actionType === "blog"),
    comment: data.filter((item) => item.actionType === "comment"),
    upvote: data.filter((item) => item.actionType === "upvote"),
    downvote: data.filter((item) => item.actionType === "downvote"),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BlogActivity data={categorizedData.blog} />
      <CommentActivity data={categorizedData.comment} />
      <UpvoteActivity data={categorizedData.upvote} />
      <DownvoteActivity data={categorizedData.downvote} />
    </div>
  );
}
