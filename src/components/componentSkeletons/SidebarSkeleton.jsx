import { SELECTABLE_DATES } from "@lib/const";
import { TextBlockSkeleton } from "./TextBlockSkeleton";
import { ImagePlaceholder } from "@components/Image";
import PropTypes from "prop-types";
import { cn } from "@lib/cn";

export function SidebarSkeleton({ contentType, cardLimit }) {
  const items = Array.from({ length: cardLimit });

  return (
    <div className="col-span-1 my-6 hidden px-2 lg:px-4 xl:block">
      <div className="flex flex-col items-center justify-between gap-4 pb-6 lg:flex-row lg:gap-0">
        <div className="text-2xl text-cyan-500">
          Upcoming {contentType === "movie" ? "Movies" : "Series"}
        </div>
        <div className="flex w-48 gap-1 lg:flex-row">
          {SELECTABLE_DATES.map((selectableDate) => (
            <TextBlockSkeleton key={selectableDate} className="h-7 flex-1" />
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-2">
        {items.map((_, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;

          return (
            <li
              key={index}
              className="group col-span-1 flex w-full items-center justify-start rounded-xl border-r-2 border-cyan-500 bg-[#131E2E] text-left"
            >
              <div className="flex w-12 items-center justify-center px-8 text-center">
                <span
                  className={cn(
                    "text-center font-londrina text-5xl",
                    isFirst && "text-red-500",
                    isSecond && "text-blue-400",
                    isThird && "text-yellow-500",
                  )}
                >
                  {index + 1}
                </span>
              </div>
              <div className="flex w-full flex-row items-center gap-2 overflow-hidden">
                <ImagePlaceholder
                  isVisible={true}
                  width={185}
                  height={278}
                  className="aspect-[2/3] w-1/5"
                />
                <div className="flex w-[78%] flex-col gap-1 p-2">
                  <div className="w-full">
                    <TextBlockSkeleton className="h-5" />
                  </div>
                  <div className="flex flex-row gap-1">
                    <TextBlockSkeleton className="w-28" />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SidebarSkeleton.propTypes = {
  cardLimit: PropTypes.number,
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
};
