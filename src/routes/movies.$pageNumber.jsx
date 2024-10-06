import { createFileRoute } from "@tanstack/react-router";
import { fetchMovies } from "../api/tmdb/QueryFunctions";
import {
  ContentGrid,
  FeaturedTitlesCarousel,
  PaginationButtons,
  Sidebar,
} from "../components";

export const Route = createFileRoute("/movies/$pageNumber")({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = {
      queryKey: ["movies", pageNumber],
      queryFn: () => fetchMovies(pageNumber),
      enabled: !!pageNumber,
      keepPreviousData: true,
    };
    const context = pageNumber;
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    return await queryClient.ensureQueryData(queryContent);
  },
  component: MoviesPage,
});

function MoviesPage() {
  const { data } = Route.useLoaderData();
  const contentQuery = {
    results: data?.results?.map((obj) => ({
      ...obj,
      ["mediaType"]: "movie",
    })),
  };
  const context = Route.useRouteContext({
    select: (context) => context.context,
  });

  return (
    <>
      <FeaturedTitlesCarousel
        contentType={"movie"}
        queryType={"movies"}
        apiData={contentQuery}
      />
      <section className="grid grid-cols-4">
        <ContentGrid
          contentType={"movie"}
          title={"Movies"}
          contentQuery={contentQuery}
        />
        <Sidebar contentType={"movie"} contentQuery={contentQuery} />
        <PaginationButtons
          contentType={"movies"}
          context={context}
          totalPages={500}
        />
      </section>
    </>
  );
}
