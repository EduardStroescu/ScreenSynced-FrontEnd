import { cn } from "@lib/cn";
import PropTypes from "prop-types";
import { useState } from "react";

export function TextBlockSkeleton({ className }) {
  const [width] = useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      className={cn(
        "h-4 max-w-[--skeleton-width] animate-pulse rounded-sm bg-cyan-500",
        className,
      )}
      style={{
        "--skeleton-width": width,
      }}
    />
  );
}

TextBlockSkeleton.propTypes = {
  className: PropTypes.string,
};
