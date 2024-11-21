// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion"; // Import motion from framer-motion

// import {
//   useGetAllSavedBlogsQuery,
//   useUnsaveBlogMutation,
// } from "../../../redux/features/save/save.blog.api";
// import {
//   Card,
//   CardBody,
//   Chip,
//   Button,
//   Image,
//   Spinner,
// } from "@nextui-org/react";
// import airplane from "../../../assets/img/shared/airplane.jpg";
// import { BookmarkIcon, CalendarIcon } from "lucide-react";
// import SearchInput from "../../../shared/ui/SearchInput";
// import SavedBlogSkeleton from "./components/SavedBlogSkeleton";
// import useDebounce from "../../../🔗Hook/useDebounce";
// import { toast } from "sonner";

// const SavedBlogs = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [savedBlogsData, setSavedBlogsData] = useState<any[]>([]); // Using 'any[]' to allow any type of data
//   const [unsaveBlogId, setUnsaveBlogId] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   // Mutation for unsaving a blog
//   const [
//     unsaveBlog,
//     { isLoading: isUnsaveBlogLoading, isSuccess: isUnsaveBlogSuccess },
//   ] = useUnsaveBlogMutation();

//   // Fetch saved blogs from API
//   const {
//     data: fetchedSavedBlogs,
//     isLoading,
//     isFetching: isBlogFetching,
//   } = useGetAllSavedBlogsQuery([
//     {
//       name: "searchTerm",
//       value: debouncedSearchTerm,
//     },
//   ]);

//   // Store fetched data into local state on component mount
//   useEffect(() => {
//     if (fetchedSavedBlogs?.data) {
//       setSavedBlogsData(fetchedSavedBlogs.data);
//     }
//   }, [fetchedSavedBlogs]);

//   // Handle unsaving a blog
//   const handleUnsaveBlog = async (blogId: string) => {
//     setUnsaveBlogId(blogId); // Set the blog ID that is being unsaved

//     // Optimistically update the UI by removing the blog from the savedBlogsData
//     const updatedBlogs = savedBlogsData.filter(
//       (blog) => blog.blog._id !== blogId
//     );
//     setSavedBlogsData(updatedBlogs);

//     try {
//       // Perform the unsave mutation
//       await unsaveBlog(blogId);

//       if (isUnsaveBlogSuccess) {
//         toast.success("Successfully unsaved");
//       }
//     } catch (error) {
//       // Rollback if the unsave failed (revert the UI state change)
//       setSavedBlogsData(fetchedSavedBlogs.data); // Restore original state
//       toast.error("Failed to unsave");
//     } finally {
//       setUnsaveBlogId(""); // Reset unsave state
//     }
//   };

//   return (
//     <section className="container mx-auto px-4 py-8">
//       <div className="flex mb-5 items-center">
//         <div className="w-2/3">
//           <SearchInput onChange={setSearchTerm} className="w-full " />
//         </div>
//         <div className="w-1/3">
//           <Image
//             src={`${airplane}`}
//             className="w-full h-32 hidden md:block !opacity-30"
//           />
//         </div>
//       </div>
      
// {
//   isBlogFetching && (
//     <motion.div
//       className="flex justify-center pb-8"
//       initial={{ opacity: 0 }} // Start with opacity 0
//       animate={{ opacity: 1 }} // Animate to opacity 1
//       exit={{ opacity: 0 }} // Animate back to opacity 0 on exit
//       transition={{ duration: 0.5 }} // Set the duration of the animation
//     >
//       <Spinner color="default" />
//     </motion.div>
//   )
// }

//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen">
//           <SavedBlogSkeleton />
//         </div>
//       ) : savedBlogsData.length === 0 ? (
//         <p className="text-center text-gray-600">
//           You haven't saved any blogs yet.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
//           {savedBlogsData.map(
//             (
//               item: any // 'item' is typed as 'any'
//             ) => (
//               <Card
//                 key={item._id}
//                 className={`!flex group shadow-md !p-0 ${
//                   unsaveBlogId === item.blog._id && isUnsaveBlogLoading
//                     ? "opacity-50 pointer-events-none"
//                     : ""
//                 }`}
//               >
//                 <figure className="sm:h-52 md:h-44 overflow-hidden">
//                   <Image
//                     src={item.blog.image}
//                     alt={item.blog.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </figure>
//                 <CardBody>
//                   <div className="flex justify-between py-3">
//                     <h2 className="text-xl font-semibold mb-1 line-clamp-1">
//                       {item.blog.title.split(" ").slice(0, 2).join(" ")}
//                     </h2>
//                     <Button
//                       onClick={() => handleUnsaveBlog(item.blog._id)}
//                       size="sm"
//                       className="!bg-[#ff9533] text-[#fff]"
//                       startContent={<BookmarkIcon className="w-4 h-4 " />}
//                     >
//                       Unsave
//                     </Button>
//                   </div>
//                   <p className="text-[#8d8d8d] mb-2 line-clamp-2">
//                     {item.blog.description}
//                   </p>
//                   <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pb-3">
//                     {item.blog.tags
//                       .slice(0, 2)
//                       .map((tag: string, index: number) => (
//                         <Chip
//                           key={index}
//                           variant="flat"
//                           className="border bg-transparent text-primaryColor"
//                           size="sm"
//                         >
//                           {tag}
//                         </Chip>
//                       ))}
//                     <div className="flex items-center text-[gray] text-sm text-gray-500">
//                       <CalendarIcon className="w-4 h-4 mr-1 " />
//                       {new Date(item.blog.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             )
//           )}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SavedBlogs;
