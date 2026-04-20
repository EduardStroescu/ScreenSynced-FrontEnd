import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { MoviesSkeleton } from "@components/pageSkeletons/MoviesSkeleton";
import { PaginationButtons } from "@components/PaginationButtons";
import { Sidebar } from "@components/Sidebar";
import { getMoviesPageQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$pageNumber")({
  loader: async ({ params: { pageNumber }, context: { queryClient } }) => {
    try {
      const queryConfig = getMoviesPageQueryConfig(pageNumber);
      const query = await Promise.all([
        queryClient.ensureQueryData(queryConfig.popularMovies),
        queryClient.ensureQueryData(queryConfig.upcomingMovies),
      ]);

      if (!query[0]?.results?.length) throw new Error();

      return {
        popularMovies: query[0].results.map((obj) => ({
          ...obj,
          mediaType: "movie",
        })),
        upcomingMovies: { movies: query[1] },
      };
    } catch (_) {
      throw new CustomError(
        "Couldn't contact external API. Please try again later.",
      );
    }
  },
  component: MoviesPage,
  pendingComponent: MoviesSkeleton,
  pendingMs: 500,
});

function MoviesPage() {
  const { popularMovies, upcomingMovies } = Route.useLoaderData();

  const pageNumber = Route.useParams({ select: (params) => params.pageNumber });

  return (
    <>
      <FeaturedTitlesCarousel queryType="movies" apiData={popularMovies} />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType="movie"
          title="Latest Movies"
          apiData={popularMovies}
        />
        <Sidebar contentType="movie" upcomingData={upcomingMovies} />
        <PaginationButtons
          contentType="movies"
          pageNumber={pageNumber}
          totalPages={500}
        />
      </section>
    </>
  );
}
