import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo, Suspense, useRef } from "react";
import ReactPlayer from "react-player";

export const CarouselPlayer = memo(
  ({ video, shouldDisplayVideo = false, onProgress, onPlay }) => {
    const durationRef = useRef(0);

    if (!video) return null;

    return (
      <Suspense fallback={null}>
        <motion.div
          initial={{ opacity: shouldDisplayVideo ? 1 : 0 }}
          animate={{ opacity: !shouldDisplayVideo ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute -left-[25rem] -top-[103%] h-[300%] w-[300%] -translate-y-12 cursor-pointer overflow-hidden sm:-left-[40%] sm:-top-[20rem] sm:h-[180%] sm:w-[180%] md:-top-[15rem] lg:-left-[25%] lg:-top-[12rem] lg:h-[150%] lg:w-[150%] xl:-top-[6rem] 2xl:-left-[50%] 2xl:-top-[18rem] 2xl:h-[200%] 2xl:w-[200%]"
        >
          <ReactPlayer
            url={video}
            loop
            width="100%"
            height="100%"
            playing
            muted
            playsinline
            controls={false}
            config={{
              youtube: {
                playerVars: {
                  modestLogo: 1,
                  modestBranding: 1,
                  rel: 0,
                  iv_load_policy: 3,
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  start: 10,
                  playsInline: 1,
                  enablejsapi: 1,
                  origin: import.meta.env.VITE_FRONTEND_URL,
                },
              },
            }}
            onDuration={(duration) => (durationRef.current = duration)}
            onProgress={({ playedSeconds }) =>
              onProgress && onProgress(playedSeconds, durationRef.current)
            }
            onPlay={() => onPlay && onPlay()}
          />
        </motion.div>
      </Suspense>
    );
  },
);

CarouselPlayer.displayName = "CarouselPlayer";

CarouselPlayer.propTypes = {
  video: PropTypes.string,
  shouldDisplayVideo: PropTypes.bool,
  onProgress: PropTypes.func,
  onPlay: PropTypes.func,
};
