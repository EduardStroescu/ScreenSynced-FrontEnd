import PropTypes from "prop-types";
import ReactPlayer from "react-player";

export function PlayerSection({ youtubeLink, children }) {
  return (
    <section className="flex h-[500px] w-full flex-col lg:h-[800px]">
      {youtubeLink ? (
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
                start: 10,
                playsInline: 1,
                enablejsapi: 1,
                origin: import.meta.env.VITE_FRONTEND_URL,
              },
            },
          }}
          className={`h-full w-full cursor-pointer`}
        />
      ) : (
        <img
          src="/placeholders/placeholder-content.svg"
          className="h-[95%] w-full"
          loading="lazy"
          alt=""
        />
      )}
      <div className="text-serif flex flex-row gap-4 rounded-b-xl bg-[#131E2E] py-2 pl-4 text-xs sm:px-4 sm:text-sm">
        {children}
      </div>
    </section>
  );
}

PlayerSection.propTypes = {
  youtubeLink: PropTypes.string,
  children: PropTypes.node,
};
