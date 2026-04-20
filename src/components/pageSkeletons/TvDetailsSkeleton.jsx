import { CastSectionSkeleton } from "@components/componentSkeletons/CastSectionSkeleton";
import { ContentDetailsSectionSkeleton } from "@components/componentSkeletons/ContentDetailsSectionSkeleton";
import { PlayerSectionSkeleton } from "@components/componentSkeletons/PlayerSectionSkeleton";
import { SeasonsSectionSkeleton } from "@components/componentSkeletons/SeasonsSectionSkeleton";
import { SimilarContentSectionSkeleton } from "@components/componentSkeletons/SimilarContentSectionSkeleton";
import { TextBlockSkeleton } from "@components/componentSkeletons/TextBlockSkeleton";
import { BookmarkIcon } from "@components/Icons";

export function TvDetailsSkeleton() {
  return (
    <div className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div className="col-span-6 grid h-full w-full grid-flow-row gap-4 xl:col-span-5">
        <PlayerSectionSkeleton>
          <div className="flex flex-row items-center gap-2">
            <BookmarkIcon className="w-[0.7rem]" />
            <TextBlockSkeleton className="mt-0.5 w-40" />
          </div>
        </PlayerSectionSkeleton>
        <ContentDetailsSectionSkeleton />
      </div>
      <SeasonsSectionSkeleton />
      <CastSectionSkeleton />
      <SimilarContentSectionSkeleton />
    </div>
  );
}
