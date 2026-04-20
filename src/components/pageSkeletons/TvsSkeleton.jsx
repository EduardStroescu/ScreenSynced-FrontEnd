import { ContentGridSkeleton } from "@components/componentSkeletons/ContentGridSkeleton";
import { FeaturedTitlesCarouselSkeleton } from "@components/componentSkeletons/FeaturedTitlesCarouselSkeleton";
import { SidebarSkeleton } from "@components/componentSkeletons/SidebarSkeleton";
import { PaginationButtons } from "@components/PaginationButtons";
import { CARD_LIMIT } from "@lib/const";
import { useParams } from "@tanstack/react-router";

export function TvsSkeleton() {
  const pageNumber = useParams({
    select: (params) => params.pageNumber,
  });

  return (
    <>
      <FeaturedTitlesCarouselSkeleton queryType={"series"} />
      <section className="grid grid-cols-4">
        <ContentGridSkeleton
          contentType="tv"
          title="Series"
          cardLimit={CARD_LIMIT + 2}
        />
        <SidebarSkeleton contentType={"tv"} cardLimit={10} />
        <PaginationButtons
          contentType={"tvs"}
          pageNumber={pageNumber}
          totalPages={500}
        />
      </section>
    </>
  );
}
