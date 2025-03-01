import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo, Suspense } from "react";
import ReactPlayer from "react-player";

export const CarouselPlayer = memo(({ video }) => {
  return (
    <Suspense fallback={null}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: video ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, delay: 5 }}
        className="pointer-events-none absolute -left-[25rem] -top-[103%] z-[103] h-[300%] w-[300%] -translate-y-12 cursor-pointer overflow-hidden sm:-left-[40%] sm:-top-[20rem] sm:h-[180%] sm:w-[180%] md:-top-[15rem] lg:-left-[25%] lg:-top-[12rem] lg:h-[150%] lg:w-[150%] xl:-top-[6rem] 2xl:-left-[50%] 2xl:-top-[18rem] 2xl:h-[200%] 2xl:w-[200%]"
      >
        {!!video && (
          <ReactPlayer
            url={video}
            loop
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  modestLogo: 1,
                  rel: 0,
                  start: 10,
                  playsInline: 1,
                  enablejsapi: 1,
                  origin: import.meta.env.VITE_FRONTEND_URL,
                },
              },
            }}
          />
        )}
      </motion.div>
    </Suspense>
  );
});

CarouselPlayer.displayName = "CarouselPlayer";

CarouselPlayer.propTypes = {
  video: PropTypes.string,
};
