import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { TvsSkeleton } from "@components/pageSkeletons/TvsSkeleton";
import { PaginationButtons } from "@components/PaginationButtons";
import { Sidebar } from "@components/Sidebar";
import { getSeriesPageQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tvs/$pageNumber")({
  loader: async ({ params: { pageNumber }, context: { queryClient } }) => {
    try {
      const queryConfig = getSeriesPageQueryConfig(pageNumber);
      const query = await Promise.all([
        queryClient.ensureQueryData(queryConfig.popularSeries),
        queryClient.ensureQueryData(queryConfig.upcomingSeries),
      ]);
      if (!query[0]?.results?.length) throw new Error();

      return {
        popularSeries: query[0].results.map((obj) => ({
          ...obj,
          mediaType: "tv",
        })),
        upcomingSeries: { tv: query[1] },
      };
    } catch (_) {
      throw new CustomError(
        "Couldn't contact external API. Please try again later.",
      );
    }
  },
  component: SeriesPage,
  pendingComponent: TvsSkeleton,
  pendingMs: 500,
});

function SeriesPage() {
  const { popularSeries, upcomingSeries } = Route.useLoaderData();

  const pageNumber = Route.useParams({
    select: (params) => params.pageNumber,
  });

  return (
    <>
      <FeaturedTitlesCarousel queryType={"series"} apiData={popularSeries} />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType="tv"
          title="Latest Series"
          apiData={popularSeries}
        />
        <Sidebar contentType={"tv"} upcomingData={upcomingSeries} />
        <PaginationButtons
          contentType={"tvs"}
          pageNumber={pageNumber}
          totalPages={500}
        />
      </section>
    </>
  );
}
