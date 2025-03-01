import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { CastSection } from "@components/CastSection";
import { ContentDetailsSection } from "@components/ContentDetailsSection";
import { PlayerSection } from "@components/PlayerSection";
import { SimilarContentSection } from "@components/SimilarContentSection";
import { getMovieIdQueryConfig } from "@lib/queryConfigsForRoutes";
import { CustomError, getYoutubeLink } from "@lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movie/$movieId")({
  beforeLoad: ({ params: { movieId } }) => getMovieIdQueryConfig(movieId),
  loader: async ({ context: { queryClient, ...queryOptions } }) => {
    try {
      const query = await Promise.all([
        queryClient.ensureQueryData(queryOptions.movieDetails),
        queryClient.ensureQueryData(queryOptions.similarMovies),
      ]);

      if (!query[0]) throw new Error();

      query[0].contentType = "movie";

      return {
        contentDetails: query[0],
        similarMovies: query[1],
      };
    } catch (_) {
      throw new CustomError(
        "The resource you requested could not be found. Please try again later.",
      );
    }
  },
  component: MovieDetailsPage,
});

function MovieDetailsPage() {
  const { contentDetails, similarMovies } = Route.useLoaderData();
  const videoIds = contentDetails?.videos?.results?.find(
    (type) => type.type === "Trailer",
  )?.key;
  const youtubeLink = getYoutubeLink(videoIds);

  return (
    <section className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div className="col-span-6 grid h-full w-full grid-flow-row gap-4">
        <PlayerSection youtubeLink={youtubeLink}>
          <AddBookmarkButton
            contentId={contentDetails?.id}
            mediaType={"movie"}
            iconSize={"w-[0.7rem]"}
            className={"flex flex-row items-center justify-center gap-1"}
          >
            Add Bookmark
          </AddBookmarkButton>
        </PlayerSection>
        <ContentDetailsSection contentDetails={contentDetails} />
      </div>
      <CastSection cast={contentDetails?.credits?.cast} />
      <SimilarContentSection
        similarContent={similarMovies?.results}
        mediaType="movie"
      />
    </section>
  );
}
