export interface EngagementItem {
  count: number;
  type: string;
}

export interface UserByRole {
  count: number;
  role: string;
}

export interface RecentUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface TopFood {
  _id: string;
  foodName: string;
  foodImage: string;
  foodCategory: string;
  price: number;
  orders: number;
}

export interface OrderByStatus {
  count: number;
  revenue: number;
  status: string;
}

export interface RecentOrderFood {
  _id: string;
  foodName: string;
  foodImage: string;
}

export interface RecentOrderUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface RecentOrder {
  _id: string;
  food: RecentOrderFood;
  user: RecentOrderUser;
  status: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export interface AnalyticsMatrix {
  engagementByType: EngagementItem[];
  todayActivity: number;
  thisMonthActivity: number;
  lastMonthActivity: number;
  totalUsers: number;
  usersByRole: UserByRole[];
  recentUsers: RecentUser[];
  totalFoods: number;
  totalOrders: number;
  avgRating: number;
  availableFoods: number;
  bestsellers: number;
  topFoods: TopFood[];
  totalRevenue: number;
  ordersByStatus: OrderByStatus[];
  recentOrders: RecentOrder[];
  paymentsByStatus: unknown[];
}

export interface AnalyticsMatrixResponse {
  success: boolean;
  message: string;
  data: AnalyticsMatrix;
}
