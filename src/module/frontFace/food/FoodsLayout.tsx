import React, { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Search, X, Heart, ShoppingCart, Star, Sun, Moon,
  ChevronDown, ChevronUp, SlidersHorizontal, Flame,
  Leaf, Minus, Plus, Clock
} from "lucide-react";
import { useGetAllFoodsQuery } from "../../../redux/features/food/food.api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addToCart, selectCartItems } from "../../../redux/features/global/cartSlice";
import FoodImageWithFallback from "../../../shared/ui/FoodImageWithFallback";

// ─── constants ────────────────────────────────────────────────────────────────
const CUISINE_CATEGORIES = [
  { label: "All", value: "" },
  { label: "Indian", value: "Indian" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Mexican", value: "Mexican" },
  { label: "Thai", value: "Thai" },
  { label: "American", value: "American" },
  { label: "British", value: "British" },
  { label: "Japanese", value: "Japanese" },
];

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: 99999 },
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 – $20", min: 10, max: 20 },
  { label: "$20 – $40", min: 20, max: 40 },
  { label: "$40+", min: 40, max: 99999 },
];

const SORT_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Most Ordered", value: "-orders" },
];

const getBadge = (food: any, idx: number) => {
  if (food.orders > 5) return { label: "Trending", color: "bg-orange-500" };
  if (idx % 7 === 0)   return { label: "Must Try", color: "bg-purple-600" };
  if (idx % 11 === 0)  return { label: "New", color: "bg-blue-500" };
  return null;
};

const getAvgRating = (reviews: any[]) => {
  if (!reviews?.length) return { avg: 4.5, count: 0 };
  const avg = reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length;
  return { avg: avg.toFixed(1), count: reviews.length };
};

// ─── skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ dark }: { dark: boolean }) => (
  <div className={`rounded-2xl overflow-hidden border ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} animate-pulse`}>
    <div className={`h-44 w-full ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
    <div className="p-4 space-y-3">
      <div className={`h-3 w-1/3 rounded ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
      <div className={`h-4 w-3/4 rounded ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
      <div className={`h-3 w-1/2 rounded ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
      <div className="flex justify-between items-center pt-2">
        <div className={`h-5 w-16 rounded ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
        <div className={`h-8 w-20 rounded-full ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
      </div>
    </div>
  </div>
);

// ─── food card ────────────────────────────────────────────────────────────────
const FoodCard = ({ food, dark, idx }: { food: any; dark: boolean; idx: number }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const inCart = cartItems.some((i: any) => i._id === food._id);
  const badge = getBadge(food, idx);
  const { avg, count } = getAvgRating(food.reviews);

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) { toast.error(`${food.foodName} already in cart`); return; }
    dispatch(addToCart({ ...food, quantity: 1 }));
    toast.success(`${food.foodName} added!`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.025, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/food-details/${food._id}`)}
    >
      <div className={`h-full flex flex-col rounded-2xl overflow-hidden border transition-shadow duration-300 group-hover:shadow-xl ${
        dark ? "bg-gray-900 border-gray-800 group-hover:shadow-black/40" : "bg-white border-gray-100 group-hover:shadow-gray-200/80"
      }`}>

        {/* Image */}
        <div className="relative h-44 flex-shrink-0 overflow-hidden">
          <FoodImageWithFallback
            src={food.foodImage}
            alt={food.foodName}
            className="group-hover:scale-105 transition-transform duration-500"
          />

          {/* badge */}
          {badge && (
            <span className={`absolute top-2.5 left-2.5 ${badge.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow`}>
              {badge.label === "Trending" ? "🔥 " : badge.label === "Must Try" ? "⭐ " : "✨ "}
              {badge.label}
            </span>
          )}

          {/* veg dot */}
          <div className="absolute top-2.5 right-10 flex items-center justify-center w-5 h-5 rounded-sm border-2 border-green-500 bg-white">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>

          {/* like */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:scale-110 transition-transform"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>

          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleCart}
              className={`text-xs font-bold px-5 py-2 rounded-full shadow-xl transition-all active:scale-95 ${
                inCart ? "bg-gray-400 text-white" : "bg-emerald-500 hover:bg-emerald-400 text-white"
              }`}
            >
              {inCart ? "✓ In Cart" : "+ Add to cart"}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-3.5 gap-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
            {food.foodCategory}
          </span>

          <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${dark ? "text-white" : "text-gray-900"}`}>
            {food.foodName}
          </h3>

          <p className={`text-xs line-clamp-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {food.description}
          </p>

          {/* rating */}
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className={`text-xs font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}>{avg}</span>
            <span className={`text-[10px] ${dark ? "text-gray-600" : "text-gray-400"}`}>({count})</span>
          </div>

          {/* prep time badge */}
          <div className={`flex items-center gap-1 text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
            <Clock className="w-3 h-3" />
            <span>{10 + (idx % 5) * 5} min</span>
          </div>

          {/* price + cart */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-gray-200/30">
            <span className={`text-base font-extrabold ${dark ? "text-emerald-400" : "text-gray-900"}`}>
              ${food.price}
            </span>
            <button
              onClick={handleCart}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                inCart
                  ? dark ? "border-emerald-700 bg-emerald-900/30 text-emerald-400" : "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : dark ? "border-gray-700 text-gray-400 hover:border-emerald-600 hover:text-emerald-400" : "border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-600"
              }`}
            >
              {inCart ? <><Minus className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Add</>}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── sidebar section toggle ───────────────────────────────────────────────────
const SideSection = ({ title, children, dark }: { title: string; children: React.ReactNode; dark: boolean }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`border-b pb-4 ${dark ? "border-gray-800" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-3 text-sm font-bold ${dark ? "text-gray-200" : "text-gray-800"}`}
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 opacity-50" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── sliding search bar ────────────────────────────────────────────────────────
const SlidingSearch = ({
  open, onClose, search, setSearch, foods, dark, isLoading
}: {
  open: boolean; onClose: () => void; search: string;
  setSearch: (v: string) => void; foods: any[]; dark: boolean; isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* panel slides in from top-right */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className={`fixed top-16 right-4 md:right-8 z-50 w-[min(440px,calc(100vw-2rem))] rounded-2xl shadow-2xl border overflow-hidden ${
              dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            {/* search input */}
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${dark ? "border-gray-800" : "border-gray-100"}`}>
              <Search className={`w-4 h-4 flex-shrink-0 ${dark ? "text-gray-500" : "text-gray-400"}`} />
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes, cuisines..."
                className={`flex-1 bg-transparent outline-none text-sm ${dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400"}`}
              />
              {search && (
                <button onClick={() => setSearch("")} className={`p-1 rounded-full ${dark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* results */}
            <div className="max-h-80 overflow-y-auto overscroll-contain">
              {isLoading ? (
                <div className="space-y-2 p-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex gap-3 p-2 rounded-xl animate-pulse ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                      <div className={`w-12 h-12 rounded-lg flex-shrink-0 ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
                      <div className="flex-1 space-y-2 py-1">
                        <div className={`h-3 w-2/3 rounded ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
                        <div className={`h-3 w-1/3 rounded ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : search.trim() && foods.length === 0 ? (
                <div className={`p-6 text-center text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>
                  No results for "<strong>{search}</strong>"
                </div>
              ) : search.trim() ? (
                <ul>
                  {foods.slice(0, 8).map((food) => (
                    <li key={food._id}>
                      <button
                        onClick={() => { navigate(`/food-details/${food._id}`); onClose(); setSearch(""); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                          <FoodImageWithFallback src={food.foodImage} alt={food.foodName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-gray-900"}`}>{food.foodName}</p>
                          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{food.foodCategory} · ${food.price}</p>
                        </div>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={`p-5 text-center text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
                  Start typing to search dishes…
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── main layout ──────────────────────────────────────────────────────────────
export default function FoodsLayout() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const navigate = useNavigate();

  // filters
  const [search, setSearch]           = useState("");
  const [searchOpen, setSearchOpen]   = useState(false);
  const [page, setPage]               = useState(1);
  const [sortBy, setSortBy]           = useState("");
  const [cuisine, setCuisine]         = useState("");
  const [priceIdx, setPriceIdx]       = useState(0);
  const [dietFilter, setDietFilter]   = useState<"all" | "veg" | "nonveg">("all");

  const selectedPrice = PRICE_RANGES[priceIdx];

  const queryArgs = [
    { name: "searchTerm",  value: search },
    { name: "page",        value: page },
    { name: "limit",       value: 16 },
    { name: "minPrice",    value: selectedPrice.min },
    { name: "maxPrice",    value: selectedPrice.max },
    ...(cuisine  ? [{ name: "foodCategory", value: cuisine }] : []),
    ...(sortBy   ? [{ name: "sortBy",       value: sortBy  }] : []),
  ];

  const { data: foodData, isLoading, isFetching } = useGetAllFoodsQuery(queryArgs);
  const foods: any[] = foodData?.data ?? [];
  const meta         = foodData?.meta;
  const totalPages   = meta ? Math.ceil(meta.total / 16) : 0;

  const handleReset = () => {
    setSearch(""); setCuisine(""); setPriceIdx(0);
    setSortBy(""); setDietFilter("all"); setPage(1);
  };

  // colour helpers
  const bg   = dark ? "bg-[#0f1117]" : "bg-[#f6f7fb]";
  const surf = dark ? "bg-[#1a1d27] border-gray-800" : "bg-white border-gray-100";
  const txt  = dark ? "text-gray-100" : "text-gray-900";
  const mut  = dark ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* ── top nav bar ── */}
      <header className={`sticky top-0 z-30 border-b ${dark ? "bg-[#13161f]/95 border-gray-800" : "bg-white/95 border-gray-200"} backdrop-blur-sm`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-14 flex items-center gap-4">
          <h1 className={`text-lg font-extrabold flex-1 ${txt}`}>
            Explore <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Menu</span>
          </h1>

          {/* count */}
          <span className={`hidden sm:block text-sm ${mut}`}>
            {meta?.total ?? "–"} dishes
          </span>

          {/* search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              dark ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-emerald-600" : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-400"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Search dishes…</span>
          </button>

          {/* dark/light toggle */}
          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
              dark ? "border-gray-700 bg-gray-800 text-yellow-400 hover:bg-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* sliding search */}
      <SlidingSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        search={search}
        setSearch={(v) => { setSearch(v); setPage(1); }}
        foods={foods}
        dark={dark}
        isLoading={isFetching && !!search}
      />

      {/* ── body: sidebar + grid ── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex gap-6">

        {/* ── LEFT SIDEBAR ── */}
        <aside
          className={`hidden lg:block w-60 flex-shrink-0 self-start sticky top-16 max-h-[calc(100vh-80px)] overflow-y-auto rounded-2xl border ${surf} p-4
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
          `}
        >
          {/* header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className={`w-4 h-4 ${dark ? "text-emerald-400" : "text-emerald-600"}`} />
              <span className={`font-bold text-sm ${txt}`}>Filters</span>
            </div>
            <button onClick={handleReset} className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">
              Clear all
            </button>
          </div>

          {/* Sort by */}
          <SideSection title="Sort by" dark={dark}>
            <div className="space-y-1 mt-1">
              {SORT_OPTIONS.map((opt) => (
                <label key={opt.value} className={`flex items-center gap-2.5 cursor-pointer py-1.5 px-1 rounded-lg transition-colors ${
                  dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === opt.value}
                    onChange={() => { setSortBy(opt.value); setPage(1); }}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  <span className={`text-sm ${sortBy === opt.value ? (dark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold") : mut}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </SideSection>

          {/* Diet */}
          <SideSection title="Diet" dark={dark}>
            <div className="space-y-1 mt-1">
              {([["all", "All"], ["veg", "Vegetarian"], ["nonveg", "Non-Veg"]] as const).map(([val, lbl]) => (
                <label key={val} className={`flex items-center gap-2.5 cursor-pointer py-1.5 px-1 rounded-lg transition-colors ${
                  dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}>
                  <input
                    type="radio"
                    name="diet"
                    checked={dietFilter === val}
                    onChange={() => setDietFilter(val)}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  <span className={`text-sm flex items-center gap-1.5 ${dietFilter === val ? (dark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold") : mut}`}>
                    {val === "veg" && <Leaf className="w-3 h-3 text-green-500" />}
                    {val === "nonveg" && <Flame className="w-3 h-3 text-red-500" />}
                    {lbl}
                  </span>
                </label>
              ))}
            </div>
          </SideSection>

          {/* Price range */}
          <SideSection title="Price Range" dark={dark}>
            <div className="space-y-1 mt-1">
              {PRICE_RANGES.map((r, i) => (
                <label key={i} className={`flex items-center gap-2.5 cursor-pointer py-1.5 px-1 rounded-lg transition-colors ${
                  dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}>
                  <input
                    type="radio"
                    name="price"
                    checked={priceIdx === i}
                    onChange={() => { setPriceIdx(i); setPage(1); }}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  <span className={`text-sm ${priceIdx === i ? (dark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold") : mut}`}>
                    {r.label}
                  </span>
                </label>
              ))}
            </div>
          </SideSection>

          {/* Cuisines */}
          <SideSection title="Cuisines" dark={dark}>
            <div className="space-y-0.5 mt-1">
              {CUISINE_CATEGORIES.map((c) => (
                <label key={c.value} className={`flex items-center gap-2.5 cursor-pointer py-1.5 px-1 rounded-lg transition-colors ${
                  dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}>
                  <input
                    type="checkbox"
                    checked={cuisine === c.value}
                    onChange={() => { setCuisine(cuisine === c.value ? "" : c.value); setPage(1); }}
                    className="accent-emerald-500 w-3.5 h-3.5 rounded"
                  />
                  <span className={`text-sm ${cuisine === c.value ? (dark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold") : mut}`}>
                    {c.label}
                  </span>
                </label>
              ))}
            </div>
          </SideSection>
        </aside>

        {/* ── RIGHT: results ── */}
        <div className="flex-1 min-w-0">

          {/* Active filters chips + count */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`text-sm font-semibold ${txt}`}>
              {isLoading ? "Loading…" : `${meta?.total ?? 0} dishes found`}
            </span>

            {cuisine && (
              <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                {cuisine}
                <button onClick={() => setCuisine("")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {priceIdx > 0 && (
              <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                {PRICE_RANGES[priceIdx].label}
                <button onClick={() => setPriceIdx(0)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                "{search}"
                <button onClick={() => setSearch("")}><X className="w-3 h-3" /></button>
              </span>
            )}

            {/* mobile filters */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <select
                value={cuisine}
                onChange={(e) => { setCuisine(e.target.value); setPage(1); }}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                  dark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {CUISINE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label || "All cuisines"}</option>
                ))}
              </select>
            </div>
          </div>

          {/* grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => <SkeletonCard key={i} dark={dark} />)}
            </div>
          ) : foods.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <span className="text-6xl">🍽️</span>
              <p className={`text-lg font-bold ${txt}`}>No dishes found</p>
              <p className={`text-sm ${mut}`}>Try adjusting your filters</p>
              <button onClick={handleReset} className="mt-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold text-sm transition-colors">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <>
              {/* fetching shimmer on top */}
              {isFetching && !isLoading && (
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-800 mb-4 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}

              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {foods.map((food, idx) => (
                    <FoodCard key={food._id} food={food} dark={dark} idx={idx} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all disabled:opacity-30 ${
                      dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                    .reduce<(number | "…")[]>((acc, p, i, arr) => {
                      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "…" ? (
                        <span key={`gap-${i}`} className={`w-9 h-9 flex items-center justify-center text-sm ${mut}`}>…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setPage(p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                            page === p
                              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                              : dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all disabled:opacity-30 ${
                      dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
