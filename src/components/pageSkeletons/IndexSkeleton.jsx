import { ContentGridSkeleton } from "@components/componentSkeletons/ContentGridSkeleton";
import { FeaturedTitlesCarouselSkeleton } from "@components/componentSkeletons/FeaturedTitlesCarouselSkeleton";
import { RecommendedGridSkeleton } from "@components/componentSkeletons/RecommendedGridSkeleton";
import { SidebarSkeleton } from "@components/componentSkeletons/SidebarSkeleton";
import { CARD_LIMIT } from "@lib/const";

export function IndexSkeleton() {
  return (
    <>
      <FeaturedTitlesCarouselSkeleton />
      <div className="grid grid-flow-row lg:grid-cols-4">
        <RecommendedGridSkeleton cardLimit={CARD_LIMIT} />
        <SidebarSkeleton cardLimit={10} contentType="movie" />
        <ContentGridSkeleton
          cardLimit={CARD_LIMIT}
          title="Movies"
          contentType="movie"
          seeMore
        />
        <SidebarSkeleton cardLimit={10} contentType="tv" />
        <ContentGridSkeleton
          cardLimit={CARD_LIMIT}
          title="Series"
          contentType="tv"
          seeMore
        />
      </div>
    </>
  );
}
