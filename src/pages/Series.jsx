import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  ContentGrid,
  FeaturedTitlesCarousel,
  PaginationButtons,
  Sidebar,
} from "../components";

export function Series() {
  const { queryContent, context } = useRouteContext();
  const { data: results } = useQuery(queryContent);
  const data = results.data;
  const contentQuery = {
    results: data.results.map((obj) => ({
      ...obj,
      ["mediaType"]: "tv",
    })),
  };

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
