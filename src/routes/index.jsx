import { createFileRoute } from "@tanstack/react-router";
import { fetchAllContent } from "../api/tmdb/QueryFunctions";
import {
  CombinedGrid,
  ContentGrid,
  FeaturedTitlesCarousel,
  Sidebar,
} from "../components";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    return {
      queryContent: {
        queryKey: ["movies", "series"],
        queryFn: fetchAllContent,
      },
    };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    return await queryClient.ensureQueryData(queryContent);
  },
  component: HomePage,
});

function HomePage() {
  const queryData = Route.useLoaderData();
  const contentQuery = {
    movies: {
      results: queryData?.movies?.results.map((obj) => ({
        ...obj,
        ["mediaType"]: "movie",
      })),
    },
    tv: {
      results: queryData?.tv?.results?.map((obj) => ({
        ...obj,
        ["mediaType"]: "tv",
      })),
    },
  };

  return (
    <>
      <FeaturedTitlesCarousel
        contentType={"movie"}
        queryType={"movies"}
        apiData={contentQuery.movies}
      />
      <section className="grid grid-flow-row lg:grid-cols-4">
        <CombinedGrid contentQuery={contentQuery} />
        <Sidebar contentType={"movie"} />
        <ContentGrid
          contentType={"movie"}
          seeMore={true}
          title={"Movies"}
          queryType={"movies"}
          contentQuery={contentQuery}
        />
        <Sidebar contentType={"tv"} />
        <ContentGrid
          contentType={"tv"}
          seeMore={true}
          queryType={"tv"}
          title={"Series"}
          contentQuery={contentQuery}
        />
      </section>
    </>
  );
}
