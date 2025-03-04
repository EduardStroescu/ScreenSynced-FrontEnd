import { contentGenres } from "@api/tmdb/movieEndpoints";
import { ContentGrid } from "@components/ContentGrid";
import { PaginationButtons } from "@components/PaginationButtons";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useDiscoverQuery } from "@lib/queries";
import { jaroWinkler } from "string-similarity-alg";

export const Route = createFileRoute("/discover/$pageNumber")({
  beforeLoad: ({ params: { pageNumber = 1 } }) => {
    const context = { pageNumber: pageNumber };
    return context;
  },
  component: DiscoverPage,
});

function DiscoverPage() {
  const router = useRouter();
  const { contentType = "movies", genres } = Route.useSearch();
  const parsedGenres = genres ? genres.split(",") : [];
  const pageNumber = Route.useRouteContext({
    select: (context) => context.pageNumber,
  });

  const { data: apiData } = useDiscoverQuery(
    contentType,
    parsedGenres,
    pageNumber,
  );

  const onAddGenre = (genreName) => {
    if (parsedGenres?.includes(genreName)) {
      router.navigate({
        to: "/discover/$pageNumber",
        params: { pageNumber: 1 },
        search: {
          contentType,
          genres: parsedGenres.filter((g) => g !== genreName).join(","),
        },
      });
    } else {
      router.navigate({
        to: "/discover/$pageNumber",
        params: { pageNumber: 1 },
        search: { contentType, genres: [...parsedGenres, genreName].join(",") },
      });
    }
  };

  const findEquivalentGenres = (genres, returnType) => {
    const targetGenres =
      returnType === "movies" ? contentGenres.movies : contentGenres.series;
    const lowerCaseTargetNames = targetGenres.map((genre) =>
      genre.name.toLowerCase(),
    );

    const genresSet = new Set();

    for (const genreName of genres) {
      const lowerCaseGenreName = genreName.toLowerCase();
      const result = jaroWinkler
        .compareOneToMany(lowerCaseGenreName, lowerCaseTargetNames)
        .bestMatch()?.[lowerCaseGenreName];

      if (result?.value) {
        genresSet.add(result.value);
      }
    }

    return Array.from(genresSet).join(",");
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-2 pt-20 sm:gap-10 sm:pt-24">
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          search={{
            contentType: "movies",
            genres: findEquivalentGenres(parsedGenres, "movies"),
          }}
          className={`${
            contentType === "movies"
              ? "border-transparent bg-cyan-500"
              : "border-2 border-cyan-500 hover:bg-cyan-500"
          } rounded border-2 px-2 py-1 text-xl`}
        >
          Movies
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          search={{
            contentType: "series",
            genres: findEquivalentGenres(parsedGenres, "series"),
          }}
          className={`${
            contentType === "series"
              ? "border-transparent bg-cyan-500"
              : "border-cyan-500 hover:bg-cyan-500"
          } rounded border-2 px-4 py-1 text-xl`}
        >
          Series
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          search={{ contentType }}
          className="border-4 border-double border-cyan-500 px-2 py-1 hover:text-red-500"
        >
          Clear Filters
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-4 pt-6">
        {contentGenres[contentType].map((genre) => {
          const style = parsedGenres?.includes(genre.name.toLowerCase())
            ? "bg-cyan-500 rounded-sm"
            : "hover:border-cyan-500 rounded";
          return (
            <button
              onClick={() => onAddGenre(genre.name.toLowerCase())}
              key={genre.id}
              className={`${style} border-2 border-transparent px-2 py-1`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
      <ContentGrid
        contentType={contentType === "movies" ? "movie" : "tv"}
        apiData={apiData?.results}
      />
      {!!apiData?.results?.length && apiData?.total_pages > 1 && (
        <PaginationButtons
          contentType={"discover"}
          context={pageNumber}
          search={{ contentType, genres: parsedGenres.join(",") }}
          totalPages={500}
        />
      )}
      {!parsedGenres?.length && (
        <p className="mx-auto w-fit animate-pulse text-center font-londrina text-5xl text-cyan-500">
          NO GENRE SELECTED
        </p>
      )}
      {apiData?.results &&
        !apiData?.results?.length &&
        !!parsedGenres?.length && (
          <p className="mx-auto w-fit animate-pulse text-center font-londrina text-5xl text-red-500">
            NO RESULTS FOUND
          </p>
        )}
    </>
  );
}
