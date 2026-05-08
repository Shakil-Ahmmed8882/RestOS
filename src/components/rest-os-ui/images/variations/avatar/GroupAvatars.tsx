"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { BaseAvatar } from "./BaseAvatar";
import { AvatarSize, GroupAvatarsProps } from "./types/avatar.type";

const OVERLAP_MAP: Record<AvatarSize, string> = {
	xs: "-ml-2",
	sm: "-ml-2.5",
	md: "-ml-3",
	lg: "-ml-3.5",
	xl: "-ml-4",
};

/*=========================================================
// GroupAvatars — stacked avatars with overflow counter.
// Shows up to `maxCount` avatars; the rest collapse into
// a "+N" pill. Each visible avatar keeps its own tooltip.
=========================================================*/
export const GroupAvatars = (props: GroupAvatarsProps) => {
	const {
		users,
		maxCount = 4,
		size = "xs",
		isLoading = false,
		className,
		tooltip = true,
		overflowContent,
	} = props;

	const visible = users.slice(0, maxCount);
	const remaining = Math.max(0, users.length - maxCount);
	const overlap = OVERLAP_MAP[size];

	const overflowNames = users
		.slice(maxCount)
		.map((u) => u.name)
		.filter(Boolean)
		.join(", ");

	return (
		<div className={cn("flex items-center", className)}>
			{visible.map((user, idx) => (
				<BaseAvatar
					key={user.id ?? `${user.name ?? "user"}-${idx}`}
					src={user.src}
					name={user.name}
					size={size}
					isLoading={isLoading}
					tooltip={tooltip}
					ring
					className={idx === 0 ? "" : overlap}
				/>
			))}

			{remaining > 0 && (
				<OverflowChip
					remaining={remaining}
					size={size}
					overlap={overlap}
					tooltip={tooltip}
					tooltipLabel={overflowNames}
					content={overflowContent}
				/>
			)}
		</div>
	);
};

const SIZE_TO_CHIP: Record<AvatarSize, string> = {
	xs: "size-6 text-[10px]",
	sm: "size-8 text-xs",
	md: "size-10 text-sm",
	lg: "size-12 text-base",
	xl: "size-16 text-lg",
};

const OverflowChip = ({
	remaining,
	size,
	overlap,
	tooltip,
	tooltipLabel,
	content,
}: {
	remaining: number;
	size: AvatarSize;
	overlap: string;
	tooltip: boolean;
	tooltipLabel: string;
	content?: (remaining: number) => React.ReactNode;
}) => {
	const chip = (
		<div
			className={cn(
				"relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FEF4F6] font-proxima-nova font-medium text-[#FF124B] ring-2 ring-white shrink-0 select-none",
				SIZE_TO_CHIP[size],
				overlap,
			)}
		>
			{content ? content(remaining) : `+${remaining}`}
		</div>
	);

	if (!tooltip || !tooltipLabel) return chip;

	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>{chip}</TooltipTrigger>
				<TooltipContent>{tooltipLabel}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
