import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { ContentGrid, FeaturedTitlesCarousel, Sidebar } from "../components";

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
        <NavigationLinks context={context} />
      </section>
    </>
  );
}

function NavigationLinks({ context }) {
  return (
    <nav className="col-span-6 flex flex-row items-center justify-around gap-4 p-6 lg:col-span-3">
      <Link
        to={`/movies/$pageNumber`}
        params={{
          pageNumber:
            Number(context) > 1 ? Number(context) - 1 : Number(context),
        }}
        className={`${
          Number(context) === 1 ? "hidden" : "block"
        } text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2`}
      >
        Go Back
      </Link>
      <Link
        disabled={Number(context) === 500}
        to={`/movies/$pageNumber`}
        params={{
          pageNumber:
            Number(context) < 500 ? Number(context) + 1 : Number(context),
        }}
        className="text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2"
      >
        {Number(context.pageNumber) === 500
          ? "You've reached the end"
          : "See More"}
      </Link>
    </nav>
  );
}
