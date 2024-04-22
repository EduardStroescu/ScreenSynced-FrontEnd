import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  ContentGrid,
  FeaturedTitlesCarousel,
  PaginationButtons,
  Sidebar,
} from "../components";

export function Movies() {
  const { queryContent, context } = useRouteContext();
  const { data: results } = useQuery(queryContent);
  const data = results.data;
  const contentQuery = {
    results: data.results.map((obj) => ({
      ...obj,
      ["mediaType"]: "movie",
    })),
  };

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
