import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  CombinedGrid,
  ContentGrid,
  FeaturedTitlesCarousel,
  Sidebar,
} from "../components";

export function Home() {
  const { queryContent } = useRouteContext();
  const { data: data } = useQuery(queryContent);
  const contentQuery = {
    movies: {
      results: data.movies.results.map((obj) => ({
        ...obj,
        ["mediaType"]: "movie",
      })),
    },
    tv: {
      results: data.tv.results.map((obj) => ({
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
        <CombinedGrid />
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
