// import React, { useState } from "react";
// import {
//   Avatar,
//   Card,
//   CardBody,
//   CardHeader,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Input,
//   Skeleton,
// } from "@nextui-org/react";
// import { ChevronDown, Search } from "lucide-react";
// import dynamic from "next/dynamic";
// import { useGetAllAnalyticsQuery } from "../../../../../redux/features/analytics/analytics.api";
// import useDebounce from "../../../../../🔗Hook/useDebounce";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// const metrics = [
//   { title: "Blogs", value: "324k", color: "bg-blue-100" },
//   { title: "Comments", value: "486k", color: "bg-purple-100" },
//   { title: "Upvotes", value: "16.2k", color: "bg-green-100" },
//   { title: "Downvotes", value: "102", color: "bg-red-100" },
// ];

// export default function BlogAnalytics() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);
//   const chartOptions = {
//     chart: {
//       id: "basic-line",
//       toolbar: { show: false },
//       sparkline: { enabled: true },
//       zoom: { enabled: true },
//     },
//     stroke: { curve: "smooth", width: 2 },
//     xaxis: { type: "datetime" },
//     yaxis: { show: true, labels: { formatter: (val: number) => `${val}` } },
//     colors: ["#00D019"],
//     tooltip: {
//       enabled: true,
//       shared: true,
//       custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//         const timestamp = w.globals.labels[dataPointIndex];
//         const data = series[seriesIndex][dataPointIndex];

//         const date = new Date(timestamp);
//         const formattedDate = `${date.getDate()}/${
//           date.getMonth() + 1
//         }/${date.getFullYear()}`;

//         return `
//           <div class="text-[white] bg-primary-color p-2 rounded shadow">
//             <p><strong>Date:</strong> ${formattedDate}</p>
//             <p><strong>Count:</strong> ${data}</p>
//           </div>
//         `;
//       },
//     },
//   };

//   const generateSeriesData = () => {
//     const data = [
//       [1609459200000, 120],
//       [1609545600000, 140],
//       [1609632000000, 160],
//       [1609718400000, 180],
//       [1609804800000, 200],
//       [1609891200000, 220],
//       [1609977600000, 240],
//       [1610064000000, 260],
//       [1610150400000, 280],
//       [1610236800000, 300],
//       [1611619200000, 620],
//       [1611705600000, 640],
//       [1611792000000, 660],
//       [1611878400000, 680],
//     ];

//     return data;
//   };

//   const {
//     data,
//     isLoading: isAnalyticsLoading,
//     isError,
//   } = useGetAllAnalyticsQuery([
//     { name: "actionType", value: "blog" },
//     { name: "actionType", value: "comment" },
//     { name: "actionType", value: "upvote" },
//     { name: "actionType", value: "downvote" },
//     { name: "searchTerm", value: debouncedSearchTerm },
//   ]);

//   const renderActivityItem = (activity) => {
//     switch (activity.actionType) {
//       case "blog":
//         return (
//           <div className="p-2 rounded shadow-sm bg-blue-50">
//             <div className="flex gap-2 items-center font-semibold">
//               <Avatar
//                 size="sm"
//                 className="m-1"
//                 src={activity.userAvatar}
//                 alt={activity.userName}
//               />
//               <p className="text-[gray]">{activity.userName}</p>
//             </div>
//             <p className="mt-1 text-[gray]">{activity.description}</p>
//             <div className="mt-2">
//               <p className="text-sm text-[gray]">{activity.date}</p>
//               <img
//                 src={activity.blog.image}
//                 alt={activity.blog.title}
//                 className="w-full h-32 object-cover rounded"
//               />
//               <h3 className="font-semibold mt-1">{activity.blog.title}</h3>
//               <p className="text-sm text-[gray]">{activity.blog.category}</p>
//             </div>
//           </div>
//         );
//       case "comment":
//         return (
//           <div className="p-2 rounded shadow-sm bg-purple-50">
//             <div className="flex gap-2 items-center font-semibold">
//               <Avatar
//                 size="sm"
//                 className="m-1"
//                 src={activity.userAvatar}
//                 alt={activity.userName}
//               />
//               <p className="text-[gray]">{activity.userName}</p>
//             </div>
//             <p className="mt-1">{activity.comment}</p>
//             <p className="text-sm text-[gray] mt-1">{activity.description}</p>
//             <p className="text-sm text-[gray]">{activity.date}</p>
//           </div>
//         );
//       case "upvote":
//         return (
//           <div className="p-2 rounded shadow-sm bg-green-50">
//             <div className="flex gap-2 items-center font-semibold">
//               <Avatar
//                 size="sm"
//                 className="m-1"
//                 src={activity.userAvatar}
//                 alt={activity.userName}
//               />
//               <p className="text-[gray]">{activity.userName}</p>
//             </div>
//             <p className="text-sm text-[gray] mt-1">{activity.description}</p>
//             <p className="text-sm text-[gray]">{activity.date}</p>
//           </div>
//         );
//       case "downvote":
//         return (
//           <div className="p-2 rounded shadow-sm bg-red-50">
//             <div className="flex gap-2 items-center font-semibold">
//               <Avatar
//                 size="sm"
//                 className="m-1"
//                 src={activity.userAvatar}
//                 alt={activity.userName}
//               />
//               <p className="text-[gray]">{activity.userName}</p>
//             </div>
//             <p className="mt-1">Downvoted a blog</p>
//             <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
//             <p className="text-sm text-[gray]">{activity.date}</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="container mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {metrics.map((metric, index) => (
//             <Card
//               key={index}
//               className={`transition-transform shadow-none transform hover:scale-105 ${metric.color} hover:shadow-lg`}
//             >
//               <CardBody>
//                 <div className="flex justify-between items-center mb-2">
//                   <p className="text-sm text-gray-600">{metric.title}</p>
//                   <Dropdown>
//                     <DropdownTrigger>
//                       <button className="p-1">
//                         <ChevronDown size={16} />
//                       </button>
//                     </DropdownTrigger>
//                     <DropdownMenu>
//                       <DropdownItem>Last 7 days</DropdownItem>
//                       <DropdownItem>Last 30 days</DropdownItem>
//                       <DropdownItem>Last 3 months</DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </div>
//                 <p className="text-2xl font-bold">{metric.value}</p>
//                 <div className="h-16 w-full overflow-hidden">
//                   <Chart
//                     options={chartOptions}
//                     series={[{ data: generateSeriesData() }]}
//                     type="line"
//                     height={60}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           ))}
//         </div>

//         <Card className="shadow-none">
//           <CardHeader className="flex justify-between items-center">
//             <div className="flex gap-3 justify-between w-full">
//               <h2 className="text-lg font-semibold w-1/2 pb-8">
//                 Recent Activity
//               </h2>
//               <Input
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 color="success"
//                 classNames={{
//                   base: "max-w-full  h-10",
//                   mainWrapper: "h-full",
//                   input: "text-small",
//                   inputWrapper:
//                     "h-full font-normal text-default-500  dark:bg-default-500/20",
//                 }}
//                 placeholder="Search"
//                 size="sm"
//                 startContent={<Search size={18} />}
//                 type="search"
//               />
//             </div>
//           </CardHeader>

//           {data?.data?.length <= 0 ? (
//             <NotFound />
//           ) : (
//             <>
//               <CardBody>
//                 <div
//                   className={`${
//                     !isAnalyticsLoading && "grid"
//                   } hidden    grid-cols-3 gap-3 animate-pulse`}
//                 >
//                   <Skeleton className="w-full h-screen" />
//                   <Skeleton className="w-full h-screen" />
//                   <Skeleton className="w-full h-screen" />
//                 </div>
//                 {data && (
//                   <div
//                     className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
//                   >
//                     <div>
//                       <h3 className="font-bold text-xl  mb-4">Blogs</h3>
//                       {data.data
//                         .filter((activity) => activity.actionType === "blog")
//                         .map((activity, index) => (
//                           <div key={index} className="mb-4">
//                             {renderActivityItem(activity)}
//                           </div>
//                         ))}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-xl  mb-4">Comments</h3>
//                       {data.data
//                         .filter((activity) => activity.actionType === "comment")
//                         .map((activity, index) => (
//                           <div key={index} className="mb-4">
//                             {renderActivityItem(activity)}
//                           </div>
//                         ))}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-xl  mb-4">Upvotes</h3>
//                       {data.data
//                         .filter((activity) => activity.actionType === "upvote")
//                         .map((activity, index) => (
//                           <div key={index} className="mb-4">
//                             {renderActivityItem(activity)}
//                           </div>
//                         ))}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-xl  mb-4">Downvotes</h3>
//                       {data.data
//                         .filter(
//                           (activity) => activity.actionType === "downvote"
//                         )
//                         .map((activity, index) => (
//                           <div key={index} className="mb-4">
//                             {renderActivityItem(activity)}
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </CardBody>
//             </>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// }

// import notFoundImage from "../../../../../assets/img/shared/404-1.png";
// const NotFound = () => {
//   return (
//     <div className="animate-pulse opacity-80 w-2/3 mx-auto h-[80vh] -mt-16">
//       <img src={notFoundImage} alt="" />
//     </div>
//   );
// };

import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Skeleton } from "@nextui-org/react";
import { Search } from "lucide-react";
import useDebounce from "../../../../../🔗Hook/useDebounce";
import { useGetAllAnalyticsQuery } from "../../../../../redux/features/analytics/analytics.api";
import MetricsCard from "./components/MetricsCard";
import NotFound from "./components/NotFound";
import ActivityList from "./components/ActivityList";




const metrics = [
  { title: "Blogs", value: "324k", color: "bg-blue-100" },
  { title: "Comments", value: "486k", color: "bg-purple-100" },
  { title: "Upvotes", value: "16.2k", color: "bg-green-100" },
  { title: "Downvotes", value: "102", color: "bg-red-100" },
];

export default function AdminAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading: isAnalyticsLoading } = useGetAllAnalyticsQuery([
    { name: "actionType", value: "blog" },
    { name: "actionType", value: "comment" },
    { name: "actionType", value: "upvote" },
    { name: "actionType", value: "downvote" },
    { name: "searchTerm", value: debouncedSearchTerm },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} metric={metric} />
          ))}
        </div>

        <Card className="shadow-none">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold w-1/2 pb-8">
              Recent Activity
            </h2>
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              size="sm"
              startContent={<Search size={18} />}
              type="search"
              className="max-w-full h-10"
            />
          </CardHeader>
          {data?.data?.length <= 0 ? (
            <NotFound />
          ) : (
            <CardBody>
              {isAnalyticsLoading ? (
                <Skeleton className="w-full h-screen" />
              ) : (
                <ActivityList data={data.data} />
              )}
            </CardBody>
          )}
        </Card>
      </main>
    </div>
  );
}
