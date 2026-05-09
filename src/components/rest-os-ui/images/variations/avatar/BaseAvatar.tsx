"use client";

import { useState } from "react";

import { cn, getInitials } from "@/lib/utils";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { AvatarSize, BaseAvatarProps } from "./types/avatar.type";

const SIZE_MAP: Record<AvatarSize, { box: string; text: string }> = {
	xs: { box: "size-6", text: "text-[10px]" },
	sm: { box: "size-8", text: "text-xs" },
	md: { box: "size-10", text: "text-sm" },
	lg: { box: "size-12", text: "text-base" },
	xl: { box: "size-16", text: "text-lg" },
};

/*=========================================================
// BaseAvatar — circular avatar. Falls back to initials
// (or empty) on broken/missing URLs. Optional tooltip
// shows the user's name.
=========================================================*/
export const BaseAvatar = (props: BaseAvatarProps) => {
	const {
		src,
		name,
		alt,
		size = "md",
		isLoading = false,
		className,
		tooltip = false,
		ring = false,
	} = props;

	const [broken, setBroken] = useState(false);
	const sizing = SIZE_MAP[size];
	const showInitials = !src || broken;

	const base = (
		<div
			className={cn(
				"relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FAFAFA] font-proxima-nova text-[#141414] shrink-0 select-none",
				ring && "ring-2 ring-white",
				sizing.box,
				sizing.text,
				className,
			)}
			aria-label={name || alt}
		>
			{isLoading ? (
				<span className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
			) : showInitials ? (
				<span className="font-medium">{name ? getInitials(name) : ""}</span>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={src ?? undefined}
					alt={alt || name || ""}
					className="absolute inset-0 h-full w-full object-cover"
					onError={() => setBroken(true)}
				/>
			)}
		</div>
	);

	return base;
	// Tooltip component not available - disabled for now
	// if (!tooltip || !name) return base;
	// return (
	// 	<TooltipProvider delayDuration={100}>
	// 		<Tooltip>
	// 			<TooltipTrigger asChild>{base}</TooltipTrigger>
	// 			<TooltipContent>{name}</TooltipContent>
	// 		</Tooltip>
	// 	</TooltipProvider>
	// );
};
