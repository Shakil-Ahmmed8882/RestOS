import { useTheme } from "next-themes";
import React, { useState, useEffect, Suspense } from "react";

import { SearchBar, FloodingReview, FoodPageSkeleton } from "./data/index";
import { useGetAllFoodsQuery } from "../../../redux/features/food/food.api";
import { Filter } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Image,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import Container from "../../../shared/layouts/Container";
import NoDataFound from "../../../shared/ui/NoDataFound";
import CustomPagination from "../../../shared/ui/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryFromUrl } from "../blog/layout/BlogLayout";
import FoodFilters from "./features/FoodFilters";
import FoodList from "./features/FoodList";

// const FoodsLayout = () => {
//   const { theme } = useTheme();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const category = getCategoryFromUrl()
//   const navigate =useNavigate()

//   console.log(category)
//   const { data: foodData, isLoading } = useGetAllFoodsQuery([
//     {
//       name: "searchTerm",
//       value: searchTerm,
//     },
//     {
//       name: "page",
//       value: page,
//     },
//     {
//       name: "limit",
//       value: 8,
//     },
//     ...(category && category !== "All"
//       ? [{ name: "foodCategory", value: category }]
//       : []),
//   ]);

//   const [searchResult, setSearchResult] = useState(foodData?.data || []);
//   const [isFieldEmpty, setIsFieldEmpty] = useState(true);
//   const categories = ["All", "Indian", "Italian", "Chinese", "Mexican", "Thai"];

//   useEffect(() => {
//     if (foodData?.data) {
//       setSearchResult(foodData.data);
//     }
//   }, [foodData?.data]);

//   const meta = foodData?.meta;

//   const handleDropdownCategory = (category: string) => {
//     if (category === "all") {
//       setSearchTerm("");
//       navigate("/food");
//       return;
//     }

//     const reshapedCategory = category.split(" ").join("+");
//     navigate(`/food?category=${reshapedCategory}`);
//   };

//   return (
//     <div className={`pb-9 `}>
//       <div
//         className={`min-h-[70vh] flex justify-center relative items-center ${
//           theme === "dark" ? "bg-dark-food" : "bg-light-food"
//         }`}
//       >
//         <SearchBar
//           setSearchTerm={setSearchTerm}
//           isFieldEmpty={isFieldEmpty}
//           theme={theme}
//           searchResult={searchResult}
//           setSearchResult={setSearchResult}
//           foodData={foodData?.data}
//           setIsFieldEmpty={setIsFieldEmpty}
//         />
//         <FloodingReview />
//       </div>

//       {isLoading ? (
//         <FoodPageSkeleton />
//       ) : (
//         <Container>
//           <div className="flex gap-3 pt-6">
//             {/* step 1*/}

//             <div className="col-span-1 h-screen sticky top-0">
//               <Card className="p-3 shadow-sm">
//                 <CardBody>
//                   <div className="flex items-center gap-2 mb-4">
//                     <Filter className="w-5 h-5" />
//                     <h2 className="text-lg font-semibold">Filters</h2>
//                   </div>

//                   <Divider className="my-4" />

//                   <div className="space-y-4">
//                     <div>
//                       {" "}
//                       <h3 className="font-medium mb-2">Categories</h3>
//                       <RadioGroup>
//                         {categories.map((category) => (
//                           <Radio
//                             className=""
//                             key={category}
//                             value={category}
//                             onClick={() => handleDropdownCategory(category)}
//                           >
//                             {category}
//                           </Radio>
//                         ))}
//                       </RadioGroup>
//                     </div>

//                     <Divider className="my-4" />

//                     <div>
//                       <h3 className="font-medium mb-2">Price Range</h3>
//                       <div className="space-y-2">
//                         <Checkbox defaultSelected>$0 - $25</Checkbox>
//                         <Checkbox>$25 - $50</Checkbox>
//                         <Checkbox>$50 - $100</Checkbox>
//                         <Checkbox>$100+</Checkbox>
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </div>

//             {/* step 2 */}
//             {foodData?.data?.length > 0 ? (
//               <div className="col-span-3">
//                 <div className="grid lg:grid-cols-2 gap-6">
//                   <Suspense fallback={<div>Loading...</div>}>
//                     {foodData?.data.map((food) => (
//                       <Card key={food._id} className="p-4 shadow-sm">
//                         <Link to={`/food-details/${food._id}`} className="flex flex-row gap-4">
//                         <CardBody className="">
//                           <Image
//                             alt={food.foodName}
//                             className="object-cover rounded-lg"
//                             height={140}
//                             width={140}
//                             src={food.foodImage}
//                           />
//                           <div className="flex flex-col justify-between">
//                             <div>
//                               <h3 className="font-semibold text-lg">
//                                 {food.foodName}
//                               </h3>
//                               <p className="text-sm text-gray-500 mt-1">
//                                 {food.description}
//                               </p>
//                             </div>
//                             <div className="flex items-center justify-between mt-4">
//                               <span className="font-semibold">
//                                 ${food.price}
//                               </span>
//                               <Button
//                                 className="text-primaryColor bg-primaryColor/5 shadlow shadow-primaryColor"
//                                 size="sm"
//                               >
//                                 Add to Cart
//                               </Button>
//                             </div>
//                           </div>
//                         </CardBody>
//                         </Link>
//                       </Card>
//                     ))}
//                   </Suspense>
//                 </div>
//                     <CustomPagination
//                       currentPage={page}
//                       limit={meta?.limit}
//                       onPageChange={setPage}
//                       total={meta?.total}
//                     />
//               </div>
//             ) : (
//               <div className="w-full">
//                 <NoDataFound />
//               </div>
//             )}
//           </div>
//         </Container>
//       )}
//     </div>
//   );
// };

// export default FoodsLayout;

const FoodsLayout = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const category = getCategoryFromUrl();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState("0-100");
  const [isShowFilter, setIsShowFilter] = useState(false);

  const { data: foodData, isLoading } = useGetAllFoodsQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "page", value: page },
    { name: "limit", value: 8 },
    ...(category && category !== "All"
      ? [{ name: "foodCategory", value: category }]
      : []),
    { name: "minPrice", value: selectedRange.split("-")[0] },
    { name: "maxPrice", value: selectedRange.split("-")[1] },
  ]);

  const [searchResult, setSearchResult] = useState(foodData?.data || []);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  useEffect(() => {
    if (foodData?.data) setSearchResult(foodData.data);
  }, [foodData?.data]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchTerm("");
      setSelectedRange("0-100");
      navigate("/food");
      setIsShowFilter(false);
    } else {
      setIsShowFilter(false);
      navigate(`/food?category=${category.replace(" ", "+")}`);
    }
  };

  return (
    <div className="pb-9">
      <div
        className={`min-h-[70vh] flex justify-center items-center relative ${
          theme === "dark" ? "bg-dark-food" : "bg-light-food"
        }`}
      >
        <SearchBar
          setSearchTerm={setSearchTerm}
          isFieldEmpty={isFieldEmpty}
          theme={theme}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          foodData={foodData?.data}
          setIsFieldEmpty={setIsFieldEmpty}
        />
        <FloodingReview />
      </div>

      {isLoading ? (
        <FoodPageSkeleton />
      ) : (
        <Container>
          <div className="flex relative gap-3 pt-6">
            <Filter
              onClick={() => setIsShowFilter(!isShowFilter)}
              className="w-5 cursor-pointer h-5 z-[999] absolute md:hidden top-3 left-5 "
            />

            <FoodFilters
              setIsShowFilter={setIsShowFilter}
              isShowFilter={isShowFilter}
              handleCategoryChange={handleCategoryChange}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />

            {foodData?.data?.length > 0 ? (
              <FoodList
                foodData={foodData?.data}
                page={page}
                setPage={setPage}
                meta={foodData?.meta}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        </Container>
      )}
    </div>
  );
};

export default FoodsLayout;
