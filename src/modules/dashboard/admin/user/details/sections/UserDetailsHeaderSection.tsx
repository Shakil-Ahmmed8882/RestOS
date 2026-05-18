"use client";

import { UserProfileCardSection } from "./UserProfileCardSection";
import { UserBioDetailsSection } from "./UserBioDetailsSection";
import type { TUserDetail } from "../types";

type Props = {
  user: TUserDetail;
};

export function UserDetailsHeaderSection(props: Props) {
  const { user } = props;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-4 sm:gap-6">
      <UserProfileCardSection user={user} />
      <UserBioDetailsSection user={user} />
    </div>
  );
}
