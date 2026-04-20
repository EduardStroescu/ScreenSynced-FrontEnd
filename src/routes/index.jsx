import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { IndexSkeleton } from "@components/pageSkeletons/IndexSkeleton";
import { RecommendedGrid } from "@components/RecommendedGrid";
import { Sidebar } from "@components/Sidebar";
import { getIndexQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    try {
      const queryConfig = getIndexQueryConfig();
      const query = await Promise.all([
        queryClient.ensureQueryData(queryConfig.popularMovies),
        queryClient.ensureQueryData(queryConfig.popularSeries),
        queryClient.ensureQueryData(queryConfig.recommendedMovies),
        queryClient.ensureQueryData(queryConfig.recommendedSeries),
        queryClient.ensureQueryData(queryConfig.upcomingMovies),
        queryClient.ensureQueryData(queryConfig.upcomingSeries),
      ]);

      return {
        popular: {
          movies: query[0]?.results.map((obj) => ({
            ...obj,
            mediaType: "movie",
          })),
          tv: query[1].results.map((obj) => ({
            ...obj,
            mediaType: "tv",
          })),
        },
        recommended: {
          movies: query[2].results.map((obj) => ({
            ...obj,
            mediaType: "movie",
          })),
          tv: query[3].results.map((obj) => ({
            ...obj,
            mediaType: "tv",
          })),
        },
        upcoming: {
          movies: query[4],
          tv: query[5],
        },
      };
    } catch (_) {
      throw new CustomError(
        "Couldn't contact external API. Please try again later.",
      );
    }
  },
  component: HomePage,
  pendingComponent: IndexSkeleton,
  pendingMs: 500,
});

function HomePage() {
  const apiData = Route.useLoaderData();

  return (
    <>
      <FeaturedTitlesCarousel
        contentType="movie"
        queryType="movies"
        apiData={apiData.popular.movies}
      />
      <section className="grid grid-flow-row lg:grid-cols-4">
        <RecommendedGrid apiData={apiData.recommended} />
        <Sidebar contentType="movie" upcomingData={apiData.upcoming} />
        <ContentGrid
          contentType="movie"
          seeMore={true}
          title="Latest Movies"
          queryType="movies"
          apiData={apiData.popular}
        />
        <Sidebar contentType="tv" upcomingData={apiData.upcoming} />
        <ContentGrid
          contentType="tv"
          seeMore={true}
          queryType="tv"
          title="Latest Series"
          apiData={apiData.popular}
        />
      </section>
    </>
  );
}
