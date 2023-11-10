import { FileRoute } from "@tanstack/react-router";
import { fetchMovies } from "../api/tmdb/QueryFunctions";
import { Movies } from "../pages/Movies";

export const route = new FileRoute("/movies/$pageNumber").createRoute({
  beforeLoad: ({ params: { pageNumber } }) => {
    const queryContent = {
      queryKey: ["movies", pageNumber],
      queryFn: () => fetchMovies(pageNumber),
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
        <Movies />
      </section>
    );
  },
});
