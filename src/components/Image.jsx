import { useState } from "react";

export function Image({
  as: Element = "img",
  isInView,
  src,
  alt,
  width,
  height,
  className,
  placeholderClassName,
  motionProps,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {isInView ? (
        <>
          <Element
            {...motionProps}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${!isImageLoaded ? "hidden" : "block"} ${className}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <ImagePlaceholder
            width={width}
            height={height}
            className={`${
              isImageLoaded ? "hidden" : "block"
            } ${placeholderClassName}`}
          />
        </>
      ) : (
        <ImagePlaceholder
          width={width}
          height={height}
          className={`${
            isImageLoaded ? "hidden" : "block"
          } ${placeholderClassName}`}
        />
      )}
    </>
  );
}

export function ImagePlaceholder({ className, width, height }) {
  return (
    <img
      src="/placeholders/placeholder-content.svg"
      alt=""
      width={width}
      height={height}
      className={`${className} animate-pulse border-2 border-cyan-500`}
    />
  );
}
