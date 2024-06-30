import { createFileRoute } from "@tanstack/react-router";
import { fetchSeries } from "../api/tmdb/QueryFunctions";
import {
  ContentGrid,
  FeaturedTitlesCarousel,
  PaginationButtons,
  Sidebar,
} from "../components";

export const Route = createFileRoute("/tvs/$pageNumber")({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = {
      queryKey: ["series", pageNumber],
      queryFn: () => fetchSeries(pageNumber),
      enabled: !!pageNumber,
      keepPreviousData: true,
    };
    const context = pageNumber;
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    return await queryClient.ensureQueryData(queryContent);
  },
  component: SeriesPage,
});

function SeriesPage() {
  const { data } = Route.useLoaderData();
  const contentQuery = {
    results: data?.results?.map((obj) => ({
      ...obj,
      ["mediaType"]: "tv",
    })),
  };
  const context = Route.useRouteContext({
    select: (context) => context.context,
  });

  return (
    <>
      <FeaturedTitlesCarousel
        contentType={"tv"}
        queryType={"series"}
        apiData={contentQuery}
      />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType={"tv"}
          title={"Series"}
          contentQuery={contentQuery}
        />
        <Sidebar contentType={"tv"} contentQuery={contentQuery} />
        <PaginationButtons
          contentType={"tvs"}
          context={context}
          totalPages={500}
        />
      </section>
    </>
  );
}
