import React, { useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-size='52' font-family='sans-serif'%3E🍽️%3C/text%3E%3Ctext x='50%25' y='68%25' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%239ca3af' font-family='sans-serif'%3ENo image available%3C/text%3E%3C/svg%3E";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  skeletonClassName?: string;
}

const FoodImageWithFallback: React.FC<Props> = ({
  src,
  alt = "food",
  className = "",
  skeletonClassName = "",
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton shimmer shown while loading */}
      {!loaded && !errored && (
        <div
          className={`absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${skeletonClassName}`}
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite linear",
          }}
        />
      )}
      <img
        src={errored || !src ? PLACEHOLDER : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => { setErrored(true); setLoaded(true); }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...rest}
      />
    </div>
  );
};

export default FoodImageWithFallback;
