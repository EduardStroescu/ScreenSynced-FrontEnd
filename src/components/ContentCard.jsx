import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { Image } from "@components/Image";
import { contentItemPropTypes } from "@lib/types";
import { getContentImageUrl } from "@lib/utils";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

export const ContentCard = memo(({ content, contentType }) => {
  const isInViewRef = useRef();
  const isInView = useInView(isInViewRef, { once: true, amount: 0 });

  return (
    <motion.section
      layout="position"
      ref={isInViewRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="group relative z-[4] flex h-full w-full flex-col gap-1 overflow-hidden rounded-xl border border-transparent object-cover p-1 pb-0 transition-colors duration-300 ease-in-out hover:border-cyan-500"
    >
      <div className="pointer-events-none absolute left-1 right-1 top-1 z-[5] aspect-[2/3] rounded-xl transition-colors duration-1000 ease-in-out group-hover:bg-gradient-to-t group-hover:from-cyan-500/80 group-hover:via-cyan-500/50" />
      {contentType === "movie" ? (
        <Card
          linkTo="/movie/$movieId"
          linkParams={{ movieId: content?.id }}
          contentId={content?.id}
          contentType={contentType}
          contentTitle={content?.title || "N/A"}
          contentImage={getContentImageUrl(content, "medium", "small")}
          contentVoteAverage={content?.vote_average?.toFixed(1) || "N/A"}
          contentReleaseDate={content?.release_date?.slice(0, 4) || "N/A"}
          isInView={isInView}
        />
      ) : (
        <Card
          linkTo="/tv/$tvId"
          linkParams={{ tvId: content?.id }}
          contentId={content?.id}
          contentType={contentType}
          contentTitle={content?.name || "N/A"}
          contentImage={getContentImageUrl(content, "medium", "small")}
          contentVoteAverage={content?.vote_average?.toFixed(1) || "N/A"}
          contentReleaseDate={content?.first_air_date?.slice(0, 4) || "N/A"}
          isInView={isInView}
        />
      )}
    </motion.section>
  );
});

ContentCard.displayName = "ContentCard";

const Card = memo(
  ({
    linkTo,
    linkParams,
    contentType,
    contentId,
    contentTitle,
    contentImage,
    contentVoteAverage,
    contentReleaseDate,
    isInView,
  }) => {
    return (
      <>
        <Link
          aria-label={`Link to ${contentTitle}`}
          to={linkTo}
          params={linkParams}
          preloadDelay={1000}
          className="h-full w-full rounded-xl"
        >
          <Image
            isInView={isInView}
            src={contentImage}
            alt={`${contentTitle} poster`}
            width={342}
            height={513}
            imageClassName="rounded-xl z-[4] w-full aspect-[2/3]"
          />
        </Link>
        <article className="flex h-full w-full flex-col items-center justify-start gap-2 overflow-hidden px-3 py-2">
          <div className="flex flex-col items-center gap-2 text-xs sm:flex-row">
            <span className="translate-y-[0.02rem] rounded-sm bg-cyan-500 px-1 font-black uppercase text-[#070B11] transition-colors duration-300 ease-in-out group-hover:text-white">
              {contentType === "movie" ? "MOVIE" : "TV"}
            </span>
            <span className="flex flex-row gap-1">
              <AddBookmarkButton
                className="w-[0.7rem]"
                contentId={contentId}
                mediaType={contentType}
              />
              {contentVoteAverage} | {contentReleaseDate}
            </span>
          </div>
          <Link
            aria-label={`Link to ${contentTitle}`}
            to={linkTo}
            params={linkParams}
            preloadDelay={1000}
            className="max-w-full truncate text-center font-serif transition-colors duration-300 ease-in-out hover:text-cyan-500"
          >
            {contentTitle}
          </Link>
        </article>
      </>
    );
  },
);

Card.displayName = "Card";

Card.propTypes = {
  linkTo: PropTypes.string.isRequired,
  linkParams: PropTypes.object.isRequired,
  contentType: PropTypes.oneOf(["tv", "movie"]).isRequired,
  contentId: PropTypes.number.isRequired,
  contentTitle: PropTypes.string.isRequired,
  contentImage: PropTypes.string.isRequired,
  contentVoteAverage: PropTypes.string.isRequired,
  contentReleaseDate: PropTypes.string.isRequired,
  isInView: PropTypes.bool.isRequired,
};

ContentCard.propTypes = {
  content: contentItemPropTypes,
  contentType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
