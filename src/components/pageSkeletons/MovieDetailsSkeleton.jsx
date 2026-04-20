import { CastSectionSkeleton } from "@components/componentSkeletons/CastSectionSkeleton";
import { ContentDetailsSectionSkeleton } from "@components/componentSkeletons/ContentDetailsSectionSkeleton";
import { PlayerSectionSkeleton } from "@components/componentSkeletons/PlayerSectionSkeleton";
import { SimilarContentSectionSkeleton } from "@components/componentSkeletons/SimilarContentSectionSkeleton";
import { TextBlockSkeleton } from "@components/componentSkeletons/TextBlockSkeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div className="col-span-6 grid h-full w-full grid-flow-row gap-4">
        <PlayerSectionSkeleton>
          <TextBlockSkeleton />
        </PlayerSectionSkeleton>
        <ContentDetailsSectionSkeleton mediaType="movie" />
      </div>
      <CastSectionSkeleton />
      <SimilarContentSectionSkeleton mediaType="movie" />
    </div>
  );
}
