import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { ContentCard } from "../components";

export function SearchPage() {
  const { queryContent, context } = useRouteContext();
  const { data: data } = useQuery(queryContent);
  const filteredData = data.data.results.filter(
    (item) => item.media_type !== "person",
  );
  const contentQuery = { results: filteredData };
  const totalPages = data.data.total_pages;
  return (
    <>
      <section className="grid grid-flow-col">
        <div className="w-full rounded-xl px-1 lg:p-6 lg:py-6">
          <div className="flex flex-row items-center justify-between gap-2">
            <h1 className="px-0 pb-6 pt-16 text-4xl sm:pb-8">
              Search:
              <span className="pl-4 text-cyan-500">
                {context.searchTerm.replace(/%20/g, " ")}
              </span>
            </h1>
          </div>
          {contentQuery.results.length === 0 && (
            <div className="flex flex-col items-center gap-14">
              <h2 className="border-4 border-double border-cyan-500 p-4 text-xl text-red-500">
                We&apos;re sorry! We could not find anything with that name,
                please try looking for something different.
              </h2>
              <p className="text-xl text-red-500">OR</p>
              <Link to="/" className="rounded-xl bg-cyan-500 p-4 text-2xl">
                Return Home
              </Link>
            </div>
          )}
          <article className="grid grid-cols-2 gap-0 pb-6 sm:grid-cols-4 lg:grid-cols-6">
            {contentQuery.results?.map((content, index) => (
              <ContentCard
                content={content}
                contentType={content?.media_type}
                index={index}
                key={content.id}
              />
            ))}
          </article>
        </div>
      </section>
      <NavigationLinks
        context={context}
        contentQuery={contentQuery}
        totalPages={totalPages}
      />
    </>
  );
}

function NavigationLinks({ context, contentQuery, totalPages }) {
  return (
    <>
      {contentQuery?.results.length && (
        <nav className="col-span-3 flex flex-row items-center justify-around gap-4 p-6">
          <Link
            to={`/search/$searchTerm/$pageNumber`}
            params={{
              searchTerm: context.searchTerm,
              pageNumber:
                Number(context.pageNumber) > 1
                  ? Number(context.pageNumber) - 1
                  : Number(context.pageNumber),
            }}
            className={`${
              Number(context.pageNumber) === 1 ? "hidden" : "block"
            } text-md w-full rounded-full bg-cyan-500 px-1 py-6 text-center lg:p-2`}
          >
            Go Back
          </Link>
          <Link
            disabled={Number(context.pageNumber) === totalPages}
            to={`/search/$searchTerm/$pageNumber`}
            params={{
              searchTerm: context.searchTerm,
              pageNumber:
                Number(context.pageNumber) < 500
                  ? Number(context.pageNumber) + 1
                  : Number(context.pageNumber),
            }}
            className="text-md w-full rounded-full bg-cyan-500 py-2 text-center"
          >
            {Number(context.pageNumber) === totalPages
              ? "You've reached the end"
              : "See More"}
          </Link>
        </nav>
      )}
    </>
  );
}
