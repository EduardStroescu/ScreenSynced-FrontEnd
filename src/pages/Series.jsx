import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { ContentGrid, FeaturedTitlesCarousel, Sidebar } from "../components";

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
        <NavigationLinks context={context} />
      </section>
    </>
  );
}

function NavigationLinks({ context }) {
  return (
    <nav className="col-span-6 flex flex-row items-center justify-around gap-4 p-6 lg:col-span-3">
      <Link
        to={`/tvs/$pageNumber`}
        params={{
          pageNumber:
            Number(context) > 1 ? Number(context) - 1 : Number(context),
        }}
        className="w-full rounded-full bg-cyan-500 px-1 py-1  text-center text-sm lg:p-2"
      >
        Go Back
      </Link>
      <Link
        to={`/tvs/$pageNumber`}
        params={{
          pageNumber:
            Number(context) < 500 ? Number(context) + 1 : Number(context),
        }}
        className="w-full rounded-full bg-cyan-500 px-1 py-1  text-center text-sm lg:p-2"
      >
        See More
      </Link>
    </nav>
  );
}
