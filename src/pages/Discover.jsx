import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import { fetchContentByGenre } from "../api/tmdb/QueryFunctions";
import { contentGenres } from "../api/tmdb/movieEndpoints";
import { ContentGrid } from "../components";

export function Discover() {
  const [contentType, setContentType] = useState("movies");
  const [genres, setGenres] = useState(["action"]);
  const { pageNumber } = useRouteContext();

  const { data: data } = useQuery({
    queryKey: ["DiscoverByGenre", contentType, genres, pageNumber],
    queryFn: () => fetchContentByGenre(contentType, genres, pageNumber),
    enabled: !!contentType && !!genres && !!pageNumber,
    keepPreviousData: true,
  });
  const contentQuery = data?.data;

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
          className="rounded bg-cyan-500 px-2 py-1 text-xl"
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
          className="rounded bg-cyan-500 px-4 py-1 text-xl"
        >
          Series
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={() => setGenres([])}
          className="border-4 border-double border-cyan-500 px-2 py-1 text-cyan-500 hover:text-red-500"
        >
          Clear Filters
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-4 pt-6">
        {contentGenres[contentType].map((genre) => {
          const style = genres.includes(genre.name.toLowerCase())
            ? "bg-cyan-500 py-1 px-2 rounded-sm"
            : "";
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
      <NavigationButtons contentQuery={contentQuery} pageNumber={pageNumber} />
    </>
  );
}

function NavigationButtons({ contentQuery, pageNumber }) {
  return (
    <>
      {contentQuery && (
        <nav className="col-span-6 flex flex-row items-center justify-around gap-4 p-6 lg:col-span-3">
          <Link
            to={`/discover/$pageNumber`}
            params={{
              pageNumber:
                Number(pageNumber) > 1
                  ? Number(pageNumber) - 1
                  : Number(pageNumber),
            }}
            className={`${
              Number(pageNumber) === 1 ? "hidden" : "block"
            } text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2`}
          >
            Go Back
          </Link>
          <Link
            disabled={Number(pageNumber) === 500}
            to={`/discover/$pageNumber`}
            params={{
              pageNumber:
                Number(pageNumber) < 500
                  ? Number(pageNumber) + 1
                  : Number(pageNumber),
            }}
            className="text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2"
          >
            {Number(pageNumber.pageNumber) === 500
              ? "You've reached the end"
              : "See More"}
          </Link>
        </nav>
      )}
    </>
  );
}
