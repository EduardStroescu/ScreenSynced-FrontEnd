import { fetchContentByGenre } from "@api/tmdb/QueryFunctions";
import { contentGenres } from "@api/tmdb/movieEndpoints";
import { ContentGrid } from "@components/ContentGrid";
import { PaginationButtons } from "@components/PaginationButtons";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/discover/$pageNumber")({
  beforeLoad: ({ params: { pageNumber = 1 } }) => {
    const context = { pageNumber: pageNumber };
    return context;
  },
  component: DiscoverPage,
});

function DiscoverPage() {
  const [contentType, setContentType] = useState("movies");
  const [genres, setGenres] = useState(["action"]);
  const pageNumber = Route.useRouteContext({
    select: (context) => context.pageNumber,
  });

  const { data: queryData } = useQuery({
    queryKey: ["DiscoverByGenre", contentType, genres, pageNumber],
    queryFn: () => fetchContentByGenre(contentType, genres, pageNumber),
    enabled: !!contentType && !!genres && !!pageNumber,
    keepPreviousData: true,
  });
  const contentQuery = queryData?.data;

  const onAddGenre = (genreName) => {
    if (genres.includes(genreName)) {
      setGenres((existingGenres) =>
        existingGenres.filter((g) => g !== genreName),
      );
    } else setGenres((existingGenres) => [...existingGenres, genreName]);
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-2 pt-20 sm:gap-10 sm:pt-24">
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={() => {
            setContentType("movies");
            setGenres(["action"]);
          }}
          className={`${
            contentType === "movies"
              ? "bg-cyan-500"
              : "border-2 border-cyan-500 hover:bg-cyan-500"
          } rounded px-2 py-1 text-xl`}
        >
          Movies
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={() => {
            setContentType("series");
            setGenres(["action & adventure"]);
          }}
          className={`${
            contentType === "series"
              ? "bg-cyan-500"
              : "border-2 border-cyan-500 hover:bg-cyan-500"
          } rounded  px-4 py-1 text-xl`}
        >
          Series
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={() => setGenres([])}
          className="border-4 border-double border-cyan-500 px-2 py-1 hover:text-red-500"
        >
          Clear Filters
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-4 pt-6">
        {contentGenres[contentType].map((genre) => {
          const style = genres.includes(genre.name.toLowerCase())
            ? "bg-cyan-500 py-1 px-2 rounded-sm"
            : "hover:border-2 hover:border-cyan-500 rounded";
          return (
            <button
              onClick={() => onAddGenre(genre.name.toLowerCase())}
              key={genre.id}
              className={style}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
      <ContentGrid
        contentType={contentType === "movies" ? "movie" : "tv"}
        contentQuery={contentQuery}
      />
      {contentQuery && (
        <PaginationButtons
          contentType={"discover"}
          contentQuery={contentQuery}
          context={pageNumber}
          totalPages={500}
        />
      )}
    </>
  );
}
