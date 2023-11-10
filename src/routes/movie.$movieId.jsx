import { FileRoute } from "@tanstack/react-router";
import { fetchMovieDetailsAndCredits } from "../api/tmdb/QueryFunctions";
import { ContentDetailsPage } from "../pages";

export const route = new FileRoute("/movie/$movieId").createRoute({
  beforeLoad: ({ params: { movieId } }) => {
    const queryOptions = {
      queryKey: ["movie", "videos", "credits", "similarMovies", movieId],
      queryFn: () => fetchMovieDetailsAndCredits(movieId),
      enabled: !!movieId,
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
