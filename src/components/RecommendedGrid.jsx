import { ContentCard } from "@components/ContentCard";
import { cn } from "@lib/cn";
import { CARD_LIMIT } from "@lib/const";
import { contentItemPropTypes } from "@lib/types";
import PropTypes from "prop-types";
import { memo, useState } from "react";

export const RecommendedGrid = memo(({ apiData }) => {
  const [queryType, setQueryType] = useState("movies");

  if (!queryType) return null;

  return (
    <article className="col-span-6 my-6 px-1 lg:px-4 xl:col-span-3">
      <header className="flex flex-col items-center justify-start gap-6 pb-6  sm:flex-row">
        <h2 className="text-2xl">Recommended</h2>
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={() => setQueryType("movies")}
            className={cn(
              "rounded px-2 py-1 text-sm",
              queryType === "movies" && "bg-cyan-500",
            )}
          >
            Movies
          </button>
          <button
            onClick={() => setQueryType("tv")}
            className={cn(
              "rounded px-2 py-1 text-sm",
              queryType === "tv" && "bg-cyan-500",
            )}
          >
            TV Shows
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-6">
        {apiData?.[queryType]?.slice(0, CARD_LIMIT).map((content, index) => (
          <ContentCard
            key={content?.id || index}
            contentType={queryType === "movies" ? "movie" : "tv"}
            content={content}
          />
        ))}
      </div>
    </article>
  );
});

RecommendedGrid.displayName = "RecommendedGrid";

const resultsPropTypes = PropTypes.arrayOf(contentItemPropTypes).isRequired;

RecommendedGrid.propTypes = {
  apiData: PropTypes.shape({
    movies: resultsPropTypes,
    tv: resultsPropTypes,
  }).isRequired,
};
