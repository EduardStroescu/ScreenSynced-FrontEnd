import PropTypes from "prop-types";
import { memo, useState } from "react";

export const Image = memo(
  ({
    as: Element = "img",
    isInView,
    src,
    alt,
    width,
    height,
    className,
    placeholderClassName,
    motionProps,
  }) => {
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
  },
);

Image.displayName = "Image";

const ImagePlaceholder = ({ className, width, height }) => {
  return (
    <img
      src="/placeholders/placeholder-content.svg"
      alt=""
      width={width}
      height={height}
      className={`${className} animate-pulse border-2 border-cyan-500`}
    />
  );
};

Image.propTypes = {
  as: PropTypes.elementType,
  isInView: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  placeholderClassName: PropTypes.string,
  motionProps: PropTypes.object,
};

ImagePlaceholder.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
