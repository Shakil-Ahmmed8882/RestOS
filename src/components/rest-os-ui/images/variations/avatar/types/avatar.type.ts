import { ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BaseAvatarProps = {
	src?: string | null;
	name?: string;
	alt?: string;
	size?: AvatarSize;
	isLoading?: boolean;
	className?: string;
	tooltip?: boolean;
	ring?: boolean;
};

export type GroupAvatarUser = {
	src?: string | null;
	name?: string;
	id?: string | number;
};

export type GroupAvatarsProps = {
	users: GroupAvatarUser[];
	maxCount?: number;
	size?: AvatarSize;
	isLoading?: boolean;
	className?: string;
	tooltip?: boolean;
	overflowContent?: (remaining: number) => ReactNode;
};

export type ActiveInactiveAvatarProps = BaseAvatarProps & {
	status?: "active" | "inactive";
	showStatus?: boolean;
};
