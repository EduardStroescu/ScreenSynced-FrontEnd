import { createFileRoute } from "@tanstack/react-router";
import { fetchMovieDetailsAndCredits } from "../api/tmdb/QueryFunctions";
import { ContentDetailsPage } from "../pages";

export const Route = createFileRoute("/movie/$movieId")({
  beforeLoad: ({ params: { movieId } }) => {
    const queryOptions = {
      queryKey: ["movie", "videos", "credits", "similarMovies", movieId],
      queryFn: () => fetchMovieDetailsAndCredits(movieId),
      enabled: !!movieId,
    };

    return { queryOptions };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    return await queryClient.ensureQueryData(queryOptions);
  },
  component: MovieIdPage,
});

function MovieIdPage() {
  const queryData = Route.useLoaderData();
  const contentDetails = queryData?.contentDetails;
  return (
    <ContentDetailsPage
      queryData={queryData}
      contentDetails={contentDetails}
      mediaType={"movie"}
    />
  );
}
