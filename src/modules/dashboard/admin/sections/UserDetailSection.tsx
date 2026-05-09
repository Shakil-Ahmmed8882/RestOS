"use client";

import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BaseImage } from "@/components/common/BaseImage";
import { useRouter } from "next/navigation";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/featureApi/userApi";
import { UserDetailSkeleton } from "@/modules/dashboard/admin/skeletons/UserDetailSkeleton";
import { toast } from "sonner";

type Props = {
  userId: string;
};

export function UserDetailSection(props: Props) {
  const { userId } = props;
  const router = useRouter();
  const { data: response, isLoading, error } = useGetSingleUserQuery(userId);
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const user = (response as any)?.data;

  if (error) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-8 text-center space-y-4">
        <Icon icon="solar:inbox-linear" className="h-12 w-12 mx-auto text-muted-foreground/60" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">User not found</h3>
          <p className="text-sm text-muted-foreground">The user you're looking for doesn't exist.</p>
        </div>
        <Button onClick={() => router.back()} variant="outline" className="rounded-full">
          Go back
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  if (!user) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-8 text-center space-y-4">
        <Icon icon="solar:inbox-linear" className="h-12 w-12 mx-auto text-muted-foreground/60" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">No user data</h3>
          <p className="text-sm text-muted-foreground">Unable to load user information.</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (newStatus: "ACTIVE" | "INACTIVE") => {
    try {
      await updateUser({ id: userId, data: { status: newStatus } }).unwrap();
      toast.success(`User status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.photo} alt={user.name} />
            <AvatarFallback className="text-lg font-semibold">{user.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            <div className="flex gap-2 mt-4">
              <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="capitalize">
                {user.role?.toLowerCase()}
              </Badge>
              <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"} className="capitalize">
                {user.status?.toLowerCase()}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => handleStatusChange(user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")}
              disabled={updating}
            >
              {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.back()}
            >
              <Icon icon="solar:arrow-left-linear" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-base text-foreground mt-1">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base text-foreground mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-base text-foreground mt-1">{user.location || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
              <p className="text-base text-foreground mt-1">{user.contactNumber || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="text-base text-foreground mt-1 capitalize">{user.role?.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-base text-foreground mt-1 capitalize">{user.status?.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User ID</p>
              <p className="text-base text-foreground mt-1 font-mono text-xs break-all">{user._id}</p>
            </div>
            {user.createdAt && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Joined</p>
                <p className="text-base text-foreground mt-1">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dining Preferences */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Dining Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cuisine Preferences</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {user.cuisinePreferences && user.cuisinePreferences.length > 0 ? (
                user.cuisinePreferences.map((cuisine: string) => (
                  <Badge key={cuisine} variant="secondary">
                    {cuisine}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No preferences set</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Favorite Restaurants</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {user.favoriteRestaurants && user.favoriteRestaurants.length > 0 ? (
                user.favoriteRestaurants.map((restaurant: string) => (
                  <Badge key={restaurant} variant="outline">
                    {restaurant}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No favorites saved</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Dining Frequency</p>
            <p className="text-base text-foreground mt-1">{user.diningFrequency || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Dietary Restrictions</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {user.dietaryRestrictions && user.dietaryRestrictions.length > 0 ? (
                user.dietaryRestrictions.map((restriction: string) => (
                  <Badge key={restriction} variant="destructive" className="opacity-75">
                    {restriction}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">None specified</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      {user.socialMedia && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon icon="mdi:instagram" className="h-4 w-4" />
                Instagram
              </p>
              <p className="text-base text-foreground mt-1">{user.socialMedia.instagram || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon icon="mdi:facebook" className="h-4 w-4" />
                Facebook
              </p>
              <p className="text-base text-foreground mt-1">{user.socialMedia.facebook || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon icon="mdi:twitter" className="h-4 w-4" />
                Twitter
              </p>
              <p className="text-base text-foreground mt-1">{user.socialMedia.twitter || "—"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bio */}
      {user.bio && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Bio</h2>
          <p className="text-base text-foreground">{user.bio}</p>
        </div>
      )}
    </div>
  );
}
