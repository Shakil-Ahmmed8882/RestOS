export type UserAnalyticsRange = {
  days: number;
  from: string;
  to: string;
};

export type OrdersByStatus = {
  pending: { count: number; totalPrice: number };
  confirmed: { count: number; totalPrice: number };
  canceled: { count: number; totalPrice: number };
};

export type PaymentsByStatus = {
  pending: { count: number; amount: number };
  completed: { count: number; amount: number };
  failed: { count: number; amount: number };
  cancelled: { count: number; amount: number };
};

export type BlogStatusBucket = {
  count: number;
  upvotes: number;
  downvotes: number;
  commentsReceived: number;
};

export type BlogsByStatus = {
  pending: BlogStatusBucket;
  approved: BlogStatusBucket;
  "test-approved": BlogStatusBucket;
};

export type UserAnalyticsTotals = {
  orders: {
    all: number;
    totalValue: number;
    byStatus: OrdersByStatus;
  };
  payments: {
    totalSpent: number;
    successfulCount: number;
    byStatus: PaymentsByStatus;
  };
  blogs: {
    all: number;
    upvotesReceived: number;
    downvotesReceived: number;
    commentsReceived: number;
    byStatus: BlogsByStatus;
  };
  activity: {
    commentsWritten: number;
    repliesWritten: number;
    savedBlogs: number;
    votesCast: { upvote: number; downvote: number };
  };
};

export type OrdersDailyPoint = {
  date: string;
  pending: number;
  confirmed: number;
  canceled: number;
  totalPrice: number;
};

export type SpendDailyPoint = { date: string; amount: number; count: number };
export type BlogsDailyPoint = { date: string; count: number };
export type CommentsDailyPoint = { date: string; count: number };

export type UserAnalyticsSeries = {
  ordersDaily: OrdersDailyPoint[];
  spendDaily: SpendDailyPoint[];
  blogsDaily: BlogsDailyPoint[];
  commentsDaily: CommentsDailyPoint[];
};

export type TopFood = {
  foodId: string;
  foodName: string;
  totalQuantity: number;
  totalSpent: number;
  orderCount: number;
};

export type TopBlog = {
  blogId: string;
  title: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  engagementScore: number;
  createdAt: string;
};

export type UserAnalytics = {
  range: UserAnalyticsRange;
  totals: UserAnalyticsTotals;
  series: UserAnalyticsSeries;
  top: {
    foods: TopFood[];
    blogs: TopBlog[];
  };
};

export type UserAnalyticsResponse = {
  success: boolean;
  message: string;
  data: UserAnalytics;
};

export type AnalyticsRangeDays = 7 | 30 | 90 | 365;
