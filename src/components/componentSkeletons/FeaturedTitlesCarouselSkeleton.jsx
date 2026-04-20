import { ImagePlaceholder } from "@components/Image";
import { TextBlockSkeleton } from "./TextBlockSkeleton";

export function FeaturedTitlesCarouselSkeleton() {
  return (
    <div className="relative flex h-[70vh] w-full justify-center overflow-hidden sm:h-[45rem]">
      <ImagePlaceholder
        isVisible={true}
        width={2000}
        height={3000}
        className={
          "pointer-events-none absolute h-full w-full animate-none border-0 object-[center_53%]"
        }
      />
      <div className="absolute bottom-0 left-0 h-full w-full bg-[linear-gradient(to_top,rgba(7,11,17,1)_0%,rgba(7,11,17,0.98)_10%,rgba(7,11,17,0.8)_25%,rgba(7,11,17,0)_100%)]" />

      <div className="relative z-[104] flex flex-col items-center gap-4 self-end px-6 py-2">
        <TextBlockSkeleton className="h-10 w-full sm:h-12" />

        <div className="flex w-screen max-w-5xl flex-col items-center gap-2">
          <TextBlockSkeleton className="min-w-full" />
          <TextBlockSkeleton className="w-full" />
        </div>

        <div className="flex items-center justify-center gap-4 rounded-full">
          <TextBlockSkeleton className="h-8 w-40 rounded-full bg-cyan-500 hover:bg-cyan-600" />
          <TextBlockSkeleton className="h-8 w-40 rounded-full bg-cyan-500 hover:bg-cyan-600" />
        </div>
      </div>
    </div>
  );
}
