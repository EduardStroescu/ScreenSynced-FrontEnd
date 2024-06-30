import { createFileRoute } from "@tanstack/react-router";
import { fetchSerieDetailsAndCredits } from "../api/tmdb/QueryFunctions";
import { ContentDetailsPage } from "../pages";

export const Route = createFileRoute("/tv/$tvId")({
  beforeLoad: ({ params: { tvId } }) => {
    const queryOptions = {
      queryKey: ["serie", "videos, credits", tvId],
      queryFn: () => fetchSerieDetailsAndCredits(tvId),
      enabled: !!tvId,
    };

    return { queryOptions };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    return await queryClient.ensureQueryData(queryOptions);
  },
  component: SerieIdPage,
});

function SerieIdPage() {
  const queryData = Route.useLoaderData();
  const contentDetails = queryData?.contentDetails;
  return (
    <ContentDetailsPage
      contentDetails={contentDetails}
      queryData={queryData}
      mediaType={"tv"}
    />
  );
}
