import { FileRoute } from "@tanstack/react-router";
import { fetchSerieDetailsAndCredits } from "../api/tmdb/QueryFunctions";
import { ContentDetailsPage } from "../pages";

export const route = new FileRoute("/tv/$tvId").createRoute({
  beforeLoad: ({ params: { tvId } }) => {
    const queryOptions = {
      queryKey: ["serie", "videos, credits", tvId],
      queryFn: () => fetchSerieDetailsAndCredits(tvId),
      enabled: !!tvId,
    };

    return { queryOptions };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => {
    return <ContentDetailsPage />;
  },
});
