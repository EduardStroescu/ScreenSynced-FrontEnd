import { FileRoute } from "@tanstack/react-router";
import { fetchSeries } from "../api/tmdb/QueryFunctions";
import { Series } from "../pages/Series";

export const route = new FileRoute("/tvs/$pageNumber").createRoute({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = {
      queryKey: ["series", pageNumber],
      queryFn: () => fetchSeries(pageNumber),
      enabled: !!pageNumber,
      keepPreviousData: true,
    };
    const context = pageNumber;
    return { queryContent, context };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    await queryClient.ensureQueryData(queryContent);
  },
  component: () => {
    return (
      <section className="flex flex-col gap-10">
        <Series />
      </section>
    );
  },
});
