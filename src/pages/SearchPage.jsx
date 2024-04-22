import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { ContentCard, PaginationButtons } from "../components";

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
        <div className="min-h-[100vh] w-full rounded-xl px-1 lg:p-6 lg:py-6">
          <div className="flex flex-row items-center justify-between gap-2">
            <h1 className="px-0 pb-6 pt-16 text-4xl sm:pb-8">
              Search:
              <span className="pl-4 text-cyan-500">
                {context.searchTerm.replace(/%20/g, " ")}
              </span>
            </h1>
          </div>
          {contentQuery.results.length === 0 && (
            <div className="flex h-3/4 flex-col items-center justify-center gap-6 border-4 border-double border-cyan-500">
              <h2 className="p-4 text-2xl text-red-500">
                We&apos;re sorry! We could not find anything with that name,
                please try looking for something different.
              </h2>
              <p className="text-xl text-red-500">OR</p>
              <Link
                to="/"
                className="rounded-xl bg-cyan-500 p-2 text-xl hover:bg-cyan-600"
              >
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
      {contentQuery.results?.length !== 0 && (
        <PaginationButtons
          contentType={`search/${context.searchTerm}`}
          context={context.pageNumber}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
