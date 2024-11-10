import { fetchAllContent } from "@api/tmdb/QueryFunctions";
import { CombinedGrid } from "@components/CombinedGrid";
import { ContentGrid } from "@components/ContentGrid";
import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { Sidebar } from "@components/Sidebar";
import { createFileRoute } from "@tanstack/react-router";

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
    const data = await queryClient.ensureQueryData(queryContent);

    return {
      movies: {
        results: data?.movies?.results.map((obj) => ({
          ...obj,
          mediaType: "movie",
        })),
      },
      tv: {
        results: data?.tv?.results?.map((obj) => ({
          ...obj,
          mediaType: "tv",
        })),
      },
    };
  },
  component: HomePage,
});

function HomePage() {
  const contentQuery = Route.useLoaderData();

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
