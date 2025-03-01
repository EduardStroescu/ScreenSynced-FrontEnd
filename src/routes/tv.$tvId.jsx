import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { CastSection } from "@components/CastSection";
import { ContentDetailsSection } from "@components/ContentDetailsSection";
import { PlayerSection } from "@components/PlayerSection";
import { SeasonsSection } from "@components/SeasonsSection";
import { SimilarContentSection } from "@components/SimilarContentSection";
import { getSerieIdQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError, getYoutubeLink } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv/$tvId")({
  beforeLoad: ({ params: { tvId } }) => getSerieIdQueryConfig(tvId),
  loader: async ({ context: { queryClient, ...queryOptions } }) => {
    try {
      const query = await Promise.all([
        queryClient.ensureQueryData(queryOptions.serieDetails),
        queryClient.ensureQueryData(queryOptions.similarSeries),
      ]);
      if (!query[0]) throw new Error();

      query[0].contentType = "tv";

      return {
        contentDetails: query[0],
        similarSeries: query[1],
      };
    } catch (_) {
      throw new CustomError(
        "The resource you requested could not be found. Please try again later.",
      );
    }
  },
  component: ContentDetailsPage,
});

function ContentDetailsPage() {
  const { contentDetails, similarSeries } = Route.useLoaderData();

  const videoIds = contentDetails?.videos?.results?.find(
    (type) => type.type === "Trailer",
  )?.key;

  const youtubeLink = getYoutubeLink(videoIds);

  return (
    <section className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div
        className={`${
          contentDetails?.seasons.length
            ? "col-span-6 xl:col-span-5"
            : "col-span-6"
        } grid h-full w-full grid-flow-row gap-4`}
      >
        <PlayerSection youtubeLink={youtubeLink}>
          <AddBookmarkButton
            contentId={contentDetails?.id}
            mediaType="tv"
            iconSize={"w-[0.7rem]"}
            className={"flex flex-row items-center justify-center gap-1"}
          >
            Add Bookmark
          </AddBookmarkButton>
        </PlayerSection>
        <ContentDetailsSection contentDetails={contentDetails} />
      </div>
      <SeasonsSection seasons={contentDetails?.seasons} />
      <CastSection cast={contentDetails?.credits?.cast} />
      <SimilarContentSection
        similarContent={similarSeries?.results}
        mediaType="tv"
      />
    </section>
  );
}
