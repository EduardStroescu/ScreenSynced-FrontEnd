import { fetchSerieDetailsAndCredits } from "@api/tmdb/QueryFunctions";
import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { CastSection } from "@components/CastSection";
import { ContentDetailsSection } from "@components/ContentDetailsSection";
import { PlayerSection } from "@components/PlayerSection";
import { SeasonsSection } from "@components/SeasonsSection";
import { SimilarContentSection } from "@components/SimilarContentSection";
import { getYoutubeLink } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

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
  component: ContentDetailsPage,
});

function ContentDetailsPage() {
  const queryData = Route.useLoaderData();
  const contentDetails = queryData?.contentDetails;
  const videoIds = contentDetails.videos?.results?.find(
    (type) => type.type === "Trailer",
  )?.key;
  const youtubeLink = getYoutubeLink(videoIds);
  return (
    <section className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div
        className={`${
          contentDetails.seasons ? "col-span-6 xl:col-span-5" : "col-span-6"
        } grid h-full w-full grid-flow-row gap-4`}
      >
        <PlayerSection youtubeLink={youtubeLink}>
          <AddBookmarkButton
            contentId={contentDetails?.id}
            mediaType={"tv"}
            size={"w-[0.7rem]"}
            className={"flex flex-row items-center justify-center gap-1"}
          >
            Add Bookmark
          </AddBookmarkButton>
        </PlayerSection>
        <ContentDetailsSection
          queryData={queryData}
          contentDetails={contentDetails}
        />
      </div>
      <SeasonsSection contentDetails={contentDetails} />
      <CastSection cast={queryData.credits?.cast} />
      <SimilarContentSection
        similarContent={queryData?.similarSeries}
        mediaType={"tv"}
      />
    </section>
  );
}
