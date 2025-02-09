import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { Image } from "@components/Image";
import { backdropPrefixSmall, posterPrefixMedium } from "@lib/const";
import { placeholderImage } from "@lib/placeholders";
import { contentItemPropTypes } from "@lib/types";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import PropTypes from "prop-types";
import { useRef } from "react";

export function ContentCard({ content, contentType }) {
  const isInViewRef = useRef();
  const isInView = useInView(isInViewRef, { once: true, amount: 0 });

  const contentImage =
    content?.poster_path !== null && content?.poster_path !== undefined
      ? posterPrefixMedium + content.poster_path
      : content?.backdrop_path !== null && content?.backdrop_path !== undefined
        ? backdropPrefixSmall + content.backdrop_path
        : placeholderImage;

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
      <Link
        aria-label={`Link to ${content?.title || content?.name}`}
        to={`/${contentType}/$${contentType}Id`}
        preloadDelay={1000}
        params={{ [`${contentType}Id`]: content?.id }}
      >
        <Image
          isInView={isInView}
          src={contentImage}
          alt={`${content?.title} poster` || `${content?.name} poster`}
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
            {contentType}
          </span>
          <span className="flex flex-row gap-1">
            <AddBookmarkButton
              className={"w-[0.7rem]"}
              contentId={content?.id}
              mediaType={content?.mediaType ? content?.mediaType : contentType}
            />
            {content?.vote_average?.toFixed(1)} |{" "}
            {content?.release_date?.slice(0, 4) ||
              content?.first_air_date?.slice(0, 4)}
          </span>
        </div>
        <h3 className="w-full truncate text-center font-serif">
          {content?.title || content?.name}
        </h3>
      </article>
    </motion.section>
  );
}

ContentCard.propTypes = {
  content: contentItemPropTypes,
  contentType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
