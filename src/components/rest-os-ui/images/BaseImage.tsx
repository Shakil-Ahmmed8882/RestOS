"use client";

import Image from "next/image";
import { useState } from "react";

import defaultImage from "@/components/reusable-ui-blocks/images/assets/placeholde_image.png";
import { BaseImageProps } from "./types/baseimage.type";
import { ShowIf } from "../guard/ShowIf";

/*=========================================================
// This Base image is layer using next/image
// Handles fallback and loading states, and broken image gracefully.
// 
=========================================================*/
export const BaseImage = (props: BaseImageProps) => {
	const { src, fallback, alt, className, imgClass, ...rest } = props;

	// ── State ─────────────────────────────────────────────
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// ── Source ─────────────────────────────────────────────
	const finalSrc = hasError || !src ? fallback || defaultImage : src;
	const isFallback = hasError || !src;

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* ── Loader ── */}
			<ShowIf condition={isLoading}>
				<div
					className="absolute inset-0 animate-pulse skeletonAnimation 
                bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
				/>
			</ShowIf>

			{/* ── Image ── */}
			<Image
				key={src} // 🔥 critical fix: resets internal lifecycle cleanly
				src={finalSrc}
				alt={alt || ""}
				fill
				unoptimized
				{...rest}
				className={`
               ${imgClass}
               ${isFallback ? "object-contain p-6 bg-gray-50" : "object-cover"}
               ${hasError ? "opacity-40" : "opacity-100"}
        `}
				onError={() => setHasError(true)}
				onLoadingComplete={() => setIsLoading(false)}
			/>
		</div>
	);
};

/* ======================= USAGE EXAMPLE ===================== 
    <div className={inline-block overflow-hidden size-[400px] }>
     <BaseImage src={''} className="w-full h-full" /> 
     </div> 
*/
