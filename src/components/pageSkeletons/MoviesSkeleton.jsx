import { ContentGridSkeleton } from "@components/componentSkeletons/ContentGridSkeleton";
import { FeaturedTitlesCarouselSkeleton } from "@components/componentSkeletons/FeaturedTitlesCarouselSkeleton";
import { SidebarSkeleton } from "@components/componentSkeletons/SidebarSkeleton";
import { PaginationButtons } from "@components/PaginationButtons";
import { CARD_LIMIT } from "@lib/const";
import { useParams } from "@tanstack/react-router";

export function MoviesSkeleton() {
  const pageNumber = useParams({
    select: (params) => params.pageNumber,
  });

  return (
    <>
      <FeaturedTitlesCarouselSkeleton queryType="movies" />
      <section className="grid grid-cols-4">
        <ContentGridSkeleton
          contentType="movie"
          title="Movies"
          cardLimit={CARD_LIMIT + 2}
        />
        <SidebarSkeleton contentType="movie" cardLimit={10} />
        <PaginationButtons
          contentType="movies"
          pageNumber={pageNumber}
          totalPages={500}
        />
      </section>
    </>
  );
}
