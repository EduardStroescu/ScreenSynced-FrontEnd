import { FileRoute } from "@tanstack/react-router";
import { fetchAllContent } from "../api/tmdb/QueryFunctions";
import { Home } from "../pages/Home";

export const route = new FileRoute("/").createRoute({
  beforeLoad: () => {
    return {
      queryContent: {
        queryKey: ["movies", "series"],
        queryFn: fetchAllContent,
      },
    };
  },
  loader: async ({ context: { queryClient, queryContent } }) => {
    await queryClient.ensureQueryData(queryContent);
  },
  component: () => {
    return <Home />;
  },
});
