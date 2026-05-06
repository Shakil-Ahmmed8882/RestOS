import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useGetAllFoodsQuery } from "../../../redux/features/food/food.api";
import { useGetAllFoodsCategoriesQuery } from "../../../redux/features/food-category/foodCategory.api";
import { Search, ShoppingCart, SlidersHorizontal, X, Leaf, Flame, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addToCart, selectCartItems } from "../../../redux/features/global/cartSlice";

const PRICE_RANGES = [
  { label: "All Prices", value: "0-9999" },
  { label: "Under $15", value: "0-15" },
  { label: "$15 – $30", value: "15-30" },
  { label: "$30 – $60", value: "30-60" },
  { label: "$60+", value: "60-9999" },
];

const BADGES = ["Trending", "Must Try", "Chef's Pick", "New"];

const getBadge = (index: number) =>
  index % 5 === 0 ? "Trending" : index % 7 === 0 ? "Must Try" : index % 11 === 0 ? "Chef's Pick" : null;

const getAvgRating = (reviews: any[]) => {
  if (!reviews?.length) return 4.5;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
};

export default function FoodsLayout() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All Menus");
  const [priceRange, setPriceRange] = useState("0-9999");
  const [showFilters, setShowFilters] = useState(false);
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "nonveg">("all");

  const { data: categoriesRaw } = useGetAllFoodsCategoriesQuery([]);
  const rawCategoryList: any[] = categoriesRaw?.data ?? [];

  const builtInCategories = [
    { name: "All Menus", icon: "🍽️", count: null },
    { name: "Sea Food", icon: "🦐", count: null },
    { name: "Pizza", icon: "🍕", count: null },
    { name: "Salads", icon: "🥗", count: null },
    { name: "Tacos", icon: "🌮", count: null },
    { name: "Soups", icon: "🍲", count: null },
    { name: "Sushi", icon: "🍣", count: null },
    { name: "Beverages", icon: "🥤", count: null },
  ];

  const { data: foodData, isLoading } = useGetAllFoodsQuery([
    { name: "searchTerm", value: search },
    { name: "page", value: page },
    { name: "limit", value: 20 },
    ...(activeCategory !== "All Menus"
      ? [{ name: "foodCategory", value: activeCategory }]
      : []),
    { name: "minPrice", value: priceRange.split("-")[0] },
    { name: "maxPrice", value: priceRange.split("-")[1] },
  ]);

  const foods: any[] = foodData?.data ?? [];
  const meta = foodData?.meta;

  const handleAddToCart = (e: React.MouseEvent, food: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItems.some((i) => i._id === food._id)) {
      toast.error(`${food.foodName} already in cart`);
    } else {
      dispatch(addToCart({ ...food, quantity: 1 }));
      toast.success(`${food.foodName} added!`);
    }
  };

  const bg = dark ? "bg-[#0f1117]" : "bg-[#f5f6fa]";
  const card = dark ? "bg-[#1a1d27] border-gray-800" : "bg-white border-gray-100";
  const text = dark ? "text-gray-100" : "text-gray-900";
  const muted = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* ── Top hero bar ── */}
      <div className={`${dark ? "bg-[#13161f] border-b border-gray-800" : "bg-white border-b border-gray-200"} px-4 md:px-8 py-6`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Title */}
            <div className="flex-1">
              <h1 className={`text-2xl md:text-3xl font-extrabold ${text}`}>
                Menu <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Categories</span>
              </h1>
              <p className={`text-sm mt-0.5 ${muted}`}>
                {meta?.total ?? "–"} dishes available
              </p>
            </div>

            {/* Diet toggle */}
            <div className={`flex items-center gap-1 p-1 rounded-xl ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              {(["all", "veg", "nonveg"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDietFilter(d)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    dietFilter === d
                      ? d === "veg"
                        ? "bg-green-500 text-white shadow"
                        : d === "nonveg"
                        ? "bg-red-500 text-white shadow"
                        : "bg-emerald-500 text-white shadow"
                      : `${muted} hover:text-gray-700`
                  }`}
                >
                  {d === "veg" ? <Leaf className="w-3.5 h-3.5" /> : d === "nonveg" ? <Flame className="w-3.5 h-3.5" /> : null}
                  {d === "all" ? "All" : d === "veg" ? "Veg" : "Non Veg"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${dark ? "bg-gray-800/60 border-gray-700" : "bg-gray-100 border-gray-200"} min-w-[260px]`}>
              <Search className={`w-4 h-4 flex-shrink-0 ${muted}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search menus..."
                className={`bg-transparent outline-none text-sm flex-1 ${text} placeholder:${muted}`}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X className={`w-4 h-4 ${muted}`} />
                </button>
              )}
            </div>

            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${
                showFilters
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : dark
                  ? "border-gray-700 text-gray-300 hover:border-emerald-500"
                  : "border-gray-200 text-gray-700 hover:border-emerald-400"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {builtInCategories.map((cat) => {
              const active = activeCategory === cat.name;
              return (
                <motion.button
                  key={cat.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setActiveCategory(cat.name); setPage(1); }}
                  className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 min-w-[90px] ${
                    active
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : dark
                      ? "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-emerald-500/50"
                      : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="leading-tight text-center">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Price filter row (expandable) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-wrap gap-2 items-center pt-4 border-t border-gray-200/30">
                  <span className={`text-xs font-bold uppercase tracking-wider mr-2 ${muted}`}>Price</span>
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setPriceRange(r.value)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        priceRange === r.value
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : dark
                          ? "border-gray-700 text-gray-300 hover:border-emerald-500"
                          : "border-gray-200 text-gray-600 hover:border-emerald-400"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Food Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`${card} border rounded-2xl h-72 animate-pulse`} />
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-7xl">🍽️</span>
            <p className={`text-xl font-semibold ${text}`}>No dishes found</p>
            <p className={muted}>Try a different category or search term</p>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              <AnimatePresence>
                {foods.map((food, idx) => {
                  const badge = getBadge(idx);
                  const rating = getAvgRating(food.reviews);
                  const inCart = cartItems.some((i) => i._id === food._id);

                  return (
                    <motion.div
                      key={food._id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group"
                    >
                      <div
                        onClick={() => navigate(`/food-details/${food._id}`)}
                        className={`cursor-pointer ${card} border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                      >
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                          <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Top badge */}
                          {badge && (
                            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow ${
                              badge === "Trending" ? "bg-orange-500" : badge === "Must Try" ? "bg-purple-500" : "bg-blue-500"
                            }`}>
                              {badge === "Trending" ? "🔥" : "⭐"} {badge}
                            </div>
                          )}

                          {/* Diet indicator dot */}
                          <div className="absolute top-2 right-2 flex gap-1">
                            <div className="w-3.5 h-3.5 rounded-sm border-2 border-green-500 bg-white flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                          </div>

                          {/* Hover add to cart overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <button
                              onClick={(e) => handleAddToCart(e, food)}
                              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                inCart
                                  ? "bg-gray-400 text-white cursor-not-allowed"
                                  : "bg-emerald-500 hover:bg-emerald-400 text-white active:scale-95"
                              }`}
                            >
                              {inCart ? "In Cart ✓" : "Add to Cart"}
                            </button>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-3">
                          {/* Category tag */}
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                            {food.foodCategory}
                          </span>

                          {/* Name */}
                          <h3 className={`font-bold text-sm leading-tight mt-0.5 line-clamp-2 ${text}`}>
                            {food.foodName}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mt-1.5">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className={`text-xs font-semibold ${text}`}>{rating}</span>
                            <span className={`text-[10px] ${muted}`}>
                              ({food.reviews?.length || 0})
                            </span>
                          </div>

                          {/* Price row */}
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <span className={`text-base font-extrabold ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                                ${food.price}
                              </span>
                            </div>

                            {/* Quantity mini control */}
                            <button
                              onClick={(e) => handleAddToCart(e, food)}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                inCart
                                  ? dark
                                    ? "border-emerald-600 text-emerald-400 bg-emerald-900/30"
                                    : "border-emerald-300 text-emerald-600 bg-emerald-50"
                                  : dark
                                  ? "border-gray-600 text-gray-300 hover:border-emerald-500 hover:text-emerald-400"
                                  : "border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                              }`}
                            >
                              <ShoppingCart className="w-3 h-3" />
                              {inCart ? "Added" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {meta?.total > 20 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: Math.ceil(meta.total / 20) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 rounded-xl font-bold text-sm transition-all ${
                      page === p
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : dark
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
