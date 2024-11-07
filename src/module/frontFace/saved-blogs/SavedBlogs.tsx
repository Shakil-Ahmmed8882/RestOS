import React from "react";
import { useGetAllSavedBlogsQuery } from "../../../redux/features/save/save.blog.api";

const SavedBlogs = () => {
  const { data: savedBlogs } = useGetAllSavedBlogsQuery(undefined);
  console.log(savedBlogs?.data);

  return <section>
    All my saved blogs
  </section>;
};

export default SavedBlogs;
