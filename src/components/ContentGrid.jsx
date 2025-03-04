import { ContentCard } from "@components/ContentCard";
import { contentItemPropTypes } from "@lib/types";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo } from "react";

export const ContentGrid = memo(
  ({ contentType, seeMore = false, title, queryType, apiData, cardLimit }) => {
    const content = queryType ? apiData[queryType] : apiData;
    const slicedContent = cardLimit ? content?.slice(0, cardLimit) : content;

    return (
      <article className="col-span-6 rounded-xl px-1 py-6 lg:p-6 xl:col-span-3">
        <header className="flex flex-row items-center justify-between gap-2 pb-4 pl-2">
          {title && <h2 className="py-1 text-2xl">{title}</h2>}
          {seeMore && (
            <Link
              aria-label={`See more ${contentType}s`}
              to={`/${contentType}s/$pageNumber`}
              params={{ pageNumber: 2 }}
              className="mr-1 rounded-full bg-cyan-500 px-3 py-1 text-sm"
            >
              See More
            </Link>
          )}
        </header>
        <motion.section
          layout="position"
          transition={{ ease: "easeInOut" }}
          className="grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-6"
        >
          <AnimatePresence>
            {slicedContent?.map((content) => (
              <ContentCard
                key={content?.id}
                contentType={contentType}
                content={content}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      </article>
    );
  },
);

ContentGrid.displayName = "ContentGrid";

const resultsPropTypes = PropTypes.arrayOf(contentItemPropTypes).isRequired;

ContentGrid.propTypes = {
  cardLimit: PropTypes.number,
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  seeMore: PropTypes.bool,
  title: PropTypes.string,
  queryType: PropTypes.oneOf(["movies", "tv"]),
  apiData: PropTypes.oneOfType([
    resultsPropTypes,
    PropTypes.shape({
      movies: resultsPropTypes,
      tv: resultsPropTypes,
    }),
  ]),
};
