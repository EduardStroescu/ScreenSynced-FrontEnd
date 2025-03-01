import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { PaginationButtons } from "@components/PaginationButtons";
import { Sidebar } from "@components/Sidebar";
import { CARD_LIMIT } from "@lib/const";
import { getMoviesPageQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$pageNumber")({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = getMoviesPageQueryConfig(pageNumber);
    const context = pageNumber;
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    try {
      const query = await Promise.all([
        queryClient.ensureQueryData(queryContent.popularMovies),
        queryClient.ensureQueryData(queryContent.upcomingMovies),
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
});

function MoviesPage() {
  const { popularMovies, upcomingMovies } = Route.useLoaderData();

  const context = Route.useRouteContext({
    select: (context) => context.context,
  });

  return (
    <>
      <FeaturedTitlesCarousel queryType="movies" apiData={popularMovies} />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType="movie"
          title="Movies"
          apiData={popularMovies}
          cardLimit={CARD_LIMIT}
        />
        <Sidebar contentType="movie" upcomingData={upcomingMovies} />
        <PaginationButtons
          contentType="movies"
          context={context}
          totalPages={500}
        />
      </section>
    </>
  );
}
