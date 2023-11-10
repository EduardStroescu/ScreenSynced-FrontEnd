import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import { ContentCard } from "./";

export function CombinedGrid() {
  const { queryContent } = useRouteContext();
  const { data: contentQuery } = useQuery(queryContent);
  const [queryType, setQueryType] = useState("movies");
  return (
    <article className="col-span-6 rounded-xl px-1 py-6 lg:p-6 xl:col-span-3">
      <header className="flex flex-col justify-start gap-6 pb-4 pl-2 sm:flex-row">
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
        {(queryType ? contentQuery[queryType]?.results : contentQuery.results)
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
