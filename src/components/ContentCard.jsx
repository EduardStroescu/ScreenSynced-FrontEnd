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
      className="group relative z-[4] flex flex-col overflow-hidden border border-transparent object-cover hover:rounded-xl hover:border hover:border-cyan-500"
    >
      <div className="pointer-events-none absolute left-0 top-0 z-[5] aspect-[2/3] w-full rounded-xl group-hover:bg-gradient-to-t group-hover:from-cyan-500/80 group-hover:via-cyan-500/50" />
      {contentType === "movie" ? (
        <Card
          key={content?.id}
          linkTo="/movie/$movieId"
          linkParams={{ movieId: content?.id }}
          contentId={content?.id}
          contentTitle={content?.title}
          contentImage={getContentImageUrl(content, "medium", "small")}
          contentVoteAverage={content?.vote_average?.toFixed(1)}
          contentReleaseDate={content?.release_date?.slice(0, 4)}
          isInView={isInView}
        />
      ) : (
        <Card
          key={content?.id}
          linkTo="/tv/$tvId"
          linkParams={{ tvId: content?.id }}
          contentId={content?.id}
          contentTitle={content?.name}
          contentImage={getContentImageUrl(content, "medium", "small")}
          contentVoteAverage={content?.vote_average?.toFixed(1)}
          contentReleaseDate={content?.first_air_date?.slice(0, 4)}
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
        >
          <Image
            isInView={isInView}
            src={contentImage}
            alt={`${contentTitle} poster`}
            width={342}
            height={513}
            className={
              "z-[4] aspect-[2/3] w-full rounded-xl object-cover p-1 text-cyan-500"
            }
            placeholderClassName={
              "z-[4] aspect-[2/3] w-full rounded-xl object-cover p-1 text-cyan-500"
            }
          />
        </Link>
        <article className="flex h-full w-full flex-col items-center justify-start gap-2 overflow-hidden p-2">
          <div className="flex flex-col items-center gap-1 text-xs sm:flex-row">
            <span className="translate-y-[0.02rem] rounded-sm bg-cyan-500 px-1 font-black uppercase text-[#070B11] group-hover:text-white">
              Movie
            </span>
            <span className="flex flex-row gap-1">
              <AddBookmarkButton
                className={"w-[0.7rem]"}
                contentId={contentId}
                mediaType="movie"
              />
              {contentVoteAverage} | {contentReleaseDate}
            </span>
          </div>
          <h3 className="w-full truncate text-center font-serif">
            {contentTitle}
          </h3>
        </article>
      </>
    );
  },
);

Card.displayName = "Card";

Card.propTypes = {
  linkTo: PropTypes.string.isRequired,
  linkParams: PropTypes.object.isRequired,
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
