"use client";

import { Icon } from "@iconify/react";
import { useGetAllUsersQuery } from "@/redux/featureApi/userApi";
import { useGetAllFoodsQuery } from "@/redux/featureApi/foodApi";

export function FoodStatsHeaderLayout() {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: foodsData } = useGetAllFoodsQuery({ limit: "1" });

  const users = Array.isArray(usersData?.data) ? usersData.data : [];
  const foodsMeta = foodsData?.meta;

  const totalUsers = users.length || 0;
  const totalFoods = foodsMeta?.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Users Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Total Users
            </p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">
              {totalUsers}
            </p>
          </div>
          <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-lg">
            <Icon icon="solar:users-group-rounded-linear" className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Foods Card */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border border-purple-200 dark:border-purple-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Menu Items
            </p>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">
              {totalFoods}
            </p>
          </div>
          <div className="bg-purple-600 dark:bg-purple-700 p-3 rounded-lg">
            <Icon icon="solar:bag-2-linear" className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Categories
            </p>
            <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">
              10+
            </p>
          </div>
          <div className="bg-amber-600 dark:bg-amber-700 p-3 rounded-lg">
            <Icon icon="solar:layers-linear" className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
