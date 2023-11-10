import { FileRoute } from "@tanstack/react-router";
import { searchContent } from "../api/tmdb/QueryFunctions";
import { SearchPage } from "../pages";

export const route = new FileRoute(
  "/search/$searchTerm/$pageNumber",
).createRoute({
  beforeLoad: ({ params: { searchTerm, pageNumber } }) => {
    const queryContent = {
      queryKey: ["search", searchTerm, pageNumber],
      queryFn: () => searchContent(searchTerm, pageNumber),
      enabled: !!searchTerm && !!pageNumber,
      keepPreviousData: true,
    };
    const context = { searchTerm, pageNumber };
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    await queryClient.ensureQueryData(queryContent);
  },
  component: () => {
    return (
      <section className="flex flex-col gap-10">
        <SearchPage />
      </section>
    );
  },
});
