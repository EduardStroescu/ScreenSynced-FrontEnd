import { ImagePlaceholder } from "@components/Image";
import PropTypes from "prop-types";

export function PlayerSectionSkeleton({ children }) {
  return (
    <section className="flex h-[500px] w-full flex-col lg:h-[1000px]">
      <div className="relative h-full w-full">
        <ImagePlaceholder
          isVisible
          width={1602}
          height={964}
          className="absolute z-10 h-full w-full border-0"
        />
      </div>

      <div className="text-serif flex flex-row gap-4 rounded-b-xl bg-[#131E2E] py-2 pl-4 text-xs sm:px-4 sm:text-sm">
        {children}
      </div>
    </section>
  );
}

PlayerSectionSkeleton.propTypes = {
  children: PropTypes.node,
};
