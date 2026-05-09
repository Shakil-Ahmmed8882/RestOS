"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllFoodsQuery, useDeleteFoodMutation } from "@/redux/featureApi/foodApi";
import { FoodSearchBar } from "./sections/FoodSearchBar";
import { FoodGrid } from "./sections/FoodGrid";
import { FoodGridSkeleton } from "@/modules/dashboard/admin/food/loading/placeholder/FoodGridSkeleton";
import { AddFoodModal } from "@/modules/dashboard/admin/food/sections/AddFoodModal/AddFoodModal";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";
import { toast } from "sonner";

export function AllFoodsLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const [addFoodOpen, setAddFoodOpen] = useState(false);

  const queryParams = {
    page: currentPage.toString(),
    limit: "12",
    ...(searchQuery && { search: searchQuery }),
  };

  const { data, isLoading } = useGetAllFoodsQuery(queryParams);
  const [deleteFood, { isLoading: deleting }] = useDeleteFoodMutation();

  const foods: FoodItem[] = Array.isArray(data?.data) ? data.data : [];
  const metadata = data?.meta || { total: foods.length, page: currentPage, limit: 12 };
  const totalPages = Math.ceil((metadata.total || 0) / (metadata.limit || 12));

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleDeleteFood = async (foodId: string, foodName: string) => {
    const ok = window.confirm(`Delete ${foodName}?`);
    if (!ok) return;

    try {
      await deleteFood(foodId).unwrap();
      toast.success("Food deleted successfully");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete food");
    }
  };

  const handleEditFood = (foodId: string) => {
    router.push(`/admin/dashboard/foods/${foodId}/edit`);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header and Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <FoodSearchBar value={searchQuery} onChange={handleSearch} />
          </div>
          <Button onClick={() => setAddFoodOpen(true)} className="rounded-full text-white whitespace-nowrap">
            <Icon icon="solar:plus-circle-linear" className="h-5 w-5 mr-2" />
            Add Food
          </Button>
        </div>

      {/* Foods Grid */}
      {isLoading ? (
        <FoodGridSkeleton />
      ) : foods.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900/50 rounded-xl p-12 text-center">
          <Icon icon="solar:bag-linear" className="h-16 w-16 mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">No foods found</p>
          {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>}
        </div>
      ) : (
        <FoodGrid
          foods={foods}
          onViewDetails={(foodId) => router.push(`/admin/dashboard/foods/${foodId}`)}
          onEdit={handleEditFood}
          onDelete={handleDeleteFood}
          isDeleting={deleting}
        />
      )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={pageNum === currentPage}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <AddFoodModal isOpen={addFoodOpen} onOpenChange={setAddFoodOpen} />
    </>
  );
}
