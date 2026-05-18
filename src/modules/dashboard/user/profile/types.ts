// Shape mirrors the API contract for /profile/me. All fields optional-chain ready.

export type ProfileTabKey = "blogs" | "saved" | "orders" | "comments";

export type ProfileSocial = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
};

export type ProfileUser = {
  _id: string;
  name?: string;
  email?: string;
  photo?: string;
  bio?: string;
  role?: "USER" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED";
  location?: string;
  contactNumber?: string;
  socialMedia?: ProfileSocial;
  diningFrequency?: "Rarely" | "Occasionally" | "Frequently";
  cuisinePreferences?: string[];
  favoriteRestaurants?: string[];
  dietaryRestrictions?: string[];
  preferredMealTimes?: string[];
  paymentMethods?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProfileStats = {
  blogsCount: number;
  approvedBlogsCount: number;
  pendingBlogsCount: number;
  savedCount: number;
  ordersCount: number;
  commentsCount: number;
  totalUpvotesReceived: number;
};

export type ProfileHighlights = {
  cuisinePreferences?: string[];
  dietaryRestrictions?: string[];
  preferredMealTimes?: string[];
};

export type ProfileRecommendation = {
  _id: string;
  name?: string;
  photo?: string;
  bio?: string;
};

export type ProfileOverview = {
  user: ProfileUser;
  stats: ProfileStats;
  highlights: ProfileHighlights;
  recommendations: ProfileRecommendation[];
};

export type ProfileTabMeta = { page: number; limit: number; total: number };

// ── Tab item shapes ────────────────────────────────────────────────
export type BlogItem = {
  _id: string;
  title?: string;
  image?: string;
  category?: string;
  status?: "pending" | "approved" | "rejected" | string;
  upvotes?: number;
  downvotes?: number;
  commentsCount?: number;
};

export type SavedItem = {
  _id: string;
  blog?: BlogItem;
};

export type OrderItem = {
  _id: string;
  food?: { _id?: string; image?: string; name?: string; price?: number };
  quantity?: number;
  totalPrice?: number;
  status?: string;
  paymentStatus?: string;
  createdAt?: string;
};

export type CommentItem = {
  _id: string;
  comment?: string;
  image?: string;
  blog?: { _id?: string; title?: string; image?: string };
  createdAt?: string;
};

export type ProfileEditableFields = {
  name?: string;
  bio?: string;
  location?: string;
  contactNumber?: string;
  cuisinePreferences?: string[];
  favoriteRestaurants?: string[];
  dietaryRestrictions?: string[];
  preferredMealTimes?: ("Breakfast" | "Lunch" | "Dinner")[];
  paymentMethods?: ("Cash" | "Credit Card" | "Digital Wallet")[];
  diningFrequency?: "Occasionally" | "Frequently" | "Rarely";
  socialMedia?: ProfileSocial;
};

export const PROFILE_TABS: { id: ProfileTabKey; label: string; icon: string }[] = [
  { id: "blogs", label: "Publications", icon: "solar:gallery-wide-linear" },
  { id: "saved", label: "Saved", icon: "solar:bookmark-linear" },
  { id: "orders", label: "Orders", icon: "solar:bag-3-linear" },
  { id: "comments", label: "Comments", icon: "solar:chat-round-line-linear" },
];

export const MEAL_TIME_OPTIONS = ["Breakfast", "Lunch", "Dinner"] as const;
export const PAYMENT_METHOD_OPTIONS = ["Cash", "Credit Card", "Digital Wallet"] as const;
export const DINING_FREQUENCY_OPTIONS = ["Rarely", "Occasionally", "Frequently"] as const;
