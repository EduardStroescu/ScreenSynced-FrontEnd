import PropTypes from "prop-types";
import { ContentCardSkeleton } from "./ContentCardSkeleton";
import { TextBlockSkeleton } from "./TextBlockSkeleton";

export function RecommendedGridSkeleton({ cardLimit = 1 }) {
  const cards = Array.from({ length: cardLimit });

  return (
    <div className="col-span-6 my-6 px-1 lg:px-4 xl:col-span-3">
      <div className="flex flex-col items-center justify-start gap-6 pb-6 sm:flex-row">
        <span className="text-2xl">Recommended</span>
        <div className="flex flex-row items-center justify-center gap-0.5">
          <TextBlockSkeleton className="h-7 w-16" />
          <TextBlockSkeleton className="h-7 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-6">
        {cards.map((_, idx) => (
          <ContentCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

RecommendedGridSkeleton.propTypes = {
  cardLimit: PropTypes.number,
};
