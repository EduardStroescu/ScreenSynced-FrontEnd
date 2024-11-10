import { ContentCard } from "@components/ContentCard";
import { contentItemPropTypes } from "@lib/types";
import PropTypes from "prop-types";
import { useState } from "react";

export function CombinedGrid({ contentQuery }) {
  const [queryType, setQueryType] = useState("movies");

  if (!queryType) return null;

  return (
    <article className="col-span-6 my-6 px-1 lg:px-4 xl:col-span-3">
      <header className="flex flex-col items-center justify-start gap-6 pb-6  sm:flex-row">
        <h2 className="text-2xl">Recommended</h2>
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={() => setQueryType("movies")}
            className={`${
              queryType === "movies" ? "bg-cyan-500" : ""
            } rounded px-2 py-1 text-sm`}
          >
            Movies
          </button>
          <button
            onClick={() => setQueryType("tv")}
            className={`${
              queryType === "tv" ? "bg-cyan-500" : ""
            } rounded px-2 py-1 text-sm`}
          >
            TV Shows
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-6">
        {queryType &&
          contentQuery[queryType]?.results
            ?.slice(0, 18)
            .map((content, index) => (
              <ContentCard
                contentType={queryType === "movies" ? "movie" : "tv"}
                content={content}
                index={index}
                key={content.id}
              />
            ))}
      </div>
    </article>
  );
}

const resultsPropTypes = PropTypes.arrayOf(contentItemPropTypes).isRequired;

CombinedGrid.propTypes = {
  contentQuery: PropTypes.shape({
    movies: PropTypes.shape({
      results: resultsPropTypes,
    }).isRequired,
    tv: PropTypes.shape({
      results: resultsPropTypes,
    }).isRequired,
  }).isRequired,
};
