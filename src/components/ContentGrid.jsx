import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { contentItemPropTypes } from "../lib/types";
import { ContentCard } from "./";

export function ContentGrid({
  contentType,
  seeMore = false,
  title,
  queryType,
  contentQuery,
}) {
  return (
    <article className="col-span-6 rounded-xl px-1 py-6 lg:p-6 xl:col-span-3">
      <header className="flex flex-row items-center justify-between gap-2 pb-4 pl-2">
        {title && <h2 className="py-1 text-2xl">{title}</h2>}
        {seeMore && (
          <Link
            to={`/${contentType}s/$pageNumber`}
            params={{ pageNumber: 1 }}
            className="mr-1 rounded-full bg-cyan-500 px-3 py-1 text-sm"
          >
            See More
          </Link>
        )}
      </header>
      <motion.section
        layout="position"
        transition={{ ease: "easeInOut" }}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-6"
      >
        <AnimatePresence>
          {(queryType
            ? contentQuery[queryType]?.results
            : contentQuery?.results
          )
            ?.slice(0, 18)
            .map((content, index) => (
              <ContentCard
                contentType={contentType}
                content={content}
                index={index}
                key={content.id}
              />
            ))}
        </AnimatePresence>
      </motion.section>
    </article>
  );
}

const resultsPropTypes = PropTypes.arrayOf(contentItemPropTypes).isRequired;

ContentGrid.propTypes = {
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  seeMore: PropTypes.bool,
  title: PropTypes.string,
  queryType: PropTypes.oneOf(["movies", "tv"]),
  contentQuery: PropTypes.oneOfType([
    PropTypes.shape({
      page: PropTypes.number,
      results: resultsPropTypes,
      total_pages: PropTypes.number,
      total_results: PropTypes.number,
    }),
    PropTypes.shape({
      movies: PropTypes.shape({
        results: resultsPropTypes,
      }),
      tv: PropTypes.shape({
        results: resultsPropTypes,
      }),
    }),
  ]),
};
