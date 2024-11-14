import React from "react";
import { useGetAllAnalyticsQuery } from "../../../../../redux/features/analytics/analytics.api";
const BlogAnalytics = () => {
  const { data } = useGetAllAnalyticsQuery([
    { name: "actionType", value: "blog" },
  ]);

  console.log(data);

  return <section>BlogAnalytics</section>;
};

export default BlogAnalytics;
