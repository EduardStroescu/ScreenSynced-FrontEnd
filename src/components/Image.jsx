import { memo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@lib/cn";

export const Image = memo(
  ({
    as: Element = "img",
    isInView,
    src,
    alt,
    width,
    height,
    imageClassName,
    placeholderClassName,
    motionProps,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const prevSrcRef = useRef(src);

    useEffect(() => {
      if (src !== prevSrcRef.current) {
        setIsLoaded(false);
      }
    }, [src]);

    return (
      <>
        {isInView && src && (
          <Element
            {...motionProps}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "select-none object-cover",
              !isLoaded ? "hidden" : "block",
              imageClassName,
            )}
            onLoad={() => setIsLoaded(true)}
          />
        )}
        <ImagePlaceholder
          width={width}
          height={height}
          isVisible={!isLoaded || !src}
          className={cn(imageClassName, placeholderClassName)}
        />
      </>
    );
  },
);

export function ImagePlaceholder({ isVisible, width, height, className }) {
  return (
    <img
      src="/placeholders/placeholder-content.svg"
      alt=""
      width={width}
      height={height}
      className={cn(
        "pointer-events-none animate-pulse select-none border-2 border-cyan-500 object-cover text-cyan-500",
        isVisible ? "block" : "hidden",
        className,
      )}
    />
  );
}

Image.displayName = "Image";

Image.propTypes = {
  as: PropTypes.elementType,
  isInView: PropTypes.bool.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageClassName: PropTypes.string,
  placeholderClassName: PropTypes.string,
  motionProps: PropTypes.object,
};

ImagePlaceholder.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
