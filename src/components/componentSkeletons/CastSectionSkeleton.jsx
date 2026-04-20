import { MAX_CAST_SIZE } from "@components/CastSection";
import { ImagePlaceholder } from "@components/Image";
import { TextBlockSkeleton } from "./TextBlockSkeleton";

const FILTERED_ACTORS_PLACEHOLDERS = Array.from({ length: 10 });

export function CastSectionSkeleton() {
  return (
    <div className="col-span-6 flex flex-col gap-4 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="ml-1 text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FILTERED_ACTORS_PLACEHOLDERS?.slice(0, MAX_CAST_SIZE).map(
          (_, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center gap-4 pl-1"
              >
                <ImagePlaceholder
                  isVisible
                  className="aspect-[1/1] w-16 rounded-full object-cover"
                />
                <div className="flex w-full flex-col gap-1">
                  <TextBlockSkeleton className="w-full" />
                  <TextBlockSkeleton className="w-full" />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
