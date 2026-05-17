"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "./hooks/useUserDetails";
import { UserDetailsHeaderSection } from "./sections/UserDetailsHeaderSection";
import { UserSocialMediaSection } from "./sections/UserSocialMediaSection";
import { UserProductionsSection } from "./sections/UserProductionsSection";
import { UserDetailsHomeSkeleton } from "./skeletons/UserDetailsHomeSkeleton";

type Props = {
  userId: string;
};

export function UserDetailsHomeLayout(props: Props) {
  const { userId } = props;
  const router = useRouter();
  const { user, isLoading, error } = useUserDetails({ userId });

  if (isLoading) {
    return <UserDetailsHomeSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-10 text-center space-y-4">
        <Icon
          icon="solar:user-cross-linear"
          className="h-12 w-12 mx-auto text-muted-foreground/60"
        />
        <div>
          <h3 className="text-lg font-semibold text-foreground">User not found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The user you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-full"
        >
          <Icon icon="solar:arrow-left-linear" className="h-4 w-4 mr-1.5" />
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <UserDetailsHeaderSection user={user} />
      <UserSocialMediaSection socialMedia={user.socialMedia} />
      <UserProductionsSection user={user} />
    </div>
  );
}
