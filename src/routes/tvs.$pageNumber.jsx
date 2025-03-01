import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { PaginationButtons } from "@components/PaginationButtons";
import { Sidebar } from "@components/Sidebar";
import { CARD_LIMIT } from "@lib/const";
import { getSeriesPageQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tvs/$pageNumber")({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = getSeriesPageQueryConfig(pageNumber);
    const context = pageNumber;
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    try {
      const query = await Promise.all([
        queryClient.ensureQueryData(queryContent.popularSeries),
        queryClient.ensureQueryData(queryContent.upcomingSeries),
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
});

function SeriesPage() {
  const { popularSeries, upcomingSeries } = Route.useLoaderData();

  const context = Route.useRouteContext({
    select: (context) => context.context,
  });

  return (
    <>
      <FeaturedTitlesCarousel queryType={"series"} apiData={popularSeries} />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType="tv"
          title="Series"
          apiData={popularSeries}
          cardLimit={CARD_LIMIT}
        />
        <Sidebar contentType={"tv"} upcomingData={upcomingSeries} />
        <PaginationButtons
          contentType={"tvs"}
          context={context}
          totalPages={500}
        />
      </section>
    </>
  );
}
