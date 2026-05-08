"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BaseImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | null | undefined;
  fallback?: string;
  containerClassName?: string;
}

const PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'><rect width='1' height='1' fill='%23e5e7eb'/></svg>";

export function BaseImage({
  src,
  fallback = PLACEHOLDER,
  alt,
  className,
  containerClassName,
  fill,
  ...props
}: BaseImageProps) {
  const [errored, setErrored] = useState(false);
  const finalSrc = !src || errored ? fallback : src;

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      <Image
        src={finalSrc}
        alt={alt}
        fill={fill}
        onError={() => setErrored(true)}
        className={cn("object-cover", className)}
        {...props}
      />
    </div>
  );
}
