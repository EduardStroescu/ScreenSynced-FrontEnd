import { ImagePlaceholder } from "@components/Image";
import { TextBlockSkeleton } from "./TextBlockSkeleton";
import { BookmarkIcon } from "@components/Icons";

const PLACEHOLDER_GENRES = Array.from({ length: 2 });

export function ContentDetailsSectionSkeleton() {
  return (
    <article className="flex flex-col rounded-xl bg-[#131E2E] sm:flex-row">
      <ImagePlaceholder
        isVisible
        width={272}
        height={408}
        className="m-1 min-w-[272px] rounded-xl sm:w-[17rem]"
      />
      <div className="m-1 flex w-[calc(100%-8px)] flex-col items-start gap-4 rounded-xl bg-[#070B11] px-2 py-6 sm:m-1 sm:px-4">
        <DetailsPlaceholder />
        <div className="flex w-full max-w-full flex-row items-start gap-2 font-serif">
          <p className="text-cyan-500">Description:</p>
          <div className="mt-1 flex w-full flex-col gap-2">
            <TextBlockSkeleton className="w-full max-w-full" />
            <TextBlockSkeleton className="w-full max-w-full" />
            <TextBlockSkeleton />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="text-cyan-500">Genres:</p>
          {PLACEHOLDER_GENRES.map((_, index) => (
            <TextBlockSkeleton key={index} className="mt-0.5 w-28" />
          ))}
        </div>

        <div className="flex flex-row items-center gap-2">
          <span className="text-cyan-500">Director:</span>
          <ImagePlaceholder
            isVisible
            className="aspect-[1/1] w-[3rem] rounded-full object-cover"
          />
          <TextBlockSkeleton className="w-40" />
        </div>
      </div>
    </article>
  );
}

function DetailsPlaceholder() {
  return (
    <>
      <div className="flex flex-row items-center gap-0.5 font-serif">
        <TextBlockSkeleton className="mt-1 w-4" />|
        <BookmarkIcon className="w-[0.7rem]" />
        <TextBlockSkeleton className="mt-1 w-5" />|
        <TextBlockSkeleton className="mt-1 w-10" />|
        <TextBlockSkeleton className="mt-1 w-12" />
      </div>
      <TextBlockSkeleton className="h-10 w-full" />
    </>
  );
}
