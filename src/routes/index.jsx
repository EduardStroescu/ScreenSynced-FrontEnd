import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { RecommendedGrid } from "@components/RecommendedGrid";
import { Sidebar } from "@components/Sidebar";
import { CARD_LIMIT } from "@lib/const";
import { getIndexQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: getIndexQueryConfig,
  loader: async ({ context: { queryClient, ...queryContent } }) => {
    try {
      const query = await Promise.all([
        queryClient.ensureQueryData(queryContent.popularMovies),
        queryClient.ensureQueryData(queryContent.popularSeries),
        queryClient.ensureQueryData(queryContent.recommendedMovies),
        queryClient.ensureQueryData(queryContent.recommendedSeries),
        queryClient.ensureQueryData(queryContent.upcomingMovies),
        queryClient.ensureQueryData(queryContent.upcomingSeries),
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
          title="Movies"
          queryType="movies"
          apiData={apiData.popular}
          cardLimit={CARD_LIMIT}
        />
        <Sidebar contentType="tv" upcomingData={apiData.upcoming} />
        <ContentGrid
          contentType="tv"
          seeMore={true}
          queryType="tv"
          title="Series"
          apiData={apiData.popular}
          cardLimit={CARD_LIMIT}
        />
      </section>
    </>
  );
}
