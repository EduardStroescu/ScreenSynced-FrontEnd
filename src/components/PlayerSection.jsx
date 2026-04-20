import PropTypes from "prop-types";
import { memo, useState } from "react";
import ReactPlayer from "react-player";
import { Image } from "./Image";

export const PlayerSection = memo(
  ({ youtubeLink, imageFallback, children }) => {
    const [hasError, setHasError] = useState(false);

    return (
      <section className="flex h-[500px] w-full flex-col lg:h-[1000px]">
        <div className="relative h-full w-full">
          {youtubeLink && (
            <ReactPlayer
              url={youtubeLink}
              width="100%"
              height="100%"
              playing={false}
              controls
              muted={false}
              stopOnUnmount
              config={{
                youtube: {
                  playerVars: {
                    modestLogo: 1,
                    rel: 0,
                    playsInline: 1,
                    enablejsapi: 1,
                    origin: import.meta.env.VITE_FRONTEND_URL,
                  },
                },
              }}
              onError={() => setHasError(true)}
              className="absolute h-full w-full cursor-pointer"
            />
          )}

          {(!youtubeLink || hasError) && (
            <Image
              isInView
              src={imageFallback}
              alt=""
              width={1602}
              height={964}
              imageClassName="h-full w-full absolute z-10"
              placeholderClassName="animate-none border-0"
            />
          )}
        </div>

        <div className="text-serif flex flex-row gap-4 rounded-b-xl bg-[#131E2E] py-2 pl-4 text-xs sm:px-4 sm:text-sm">
          {children}
        </div>
      </section>
    );
  },
);

PlayerSection.displayName = "PlayerSection";

PlayerSection.propTypes = {
  youtubeLink: PropTypes.string,
  imageFallback: PropTypes.string,
  children: PropTypes.node,
};
