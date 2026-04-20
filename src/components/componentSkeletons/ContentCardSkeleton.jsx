import { ImagePlaceholder } from "@components/Image";
import { TextBlockSkeleton } from "./TextBlockSkeleton";

export function ContentCardSkeleton() {
  return (
    <div className="group relative z-[4] flex h-full w-full flex-col overflow-hidden border border-transparent object-cover p-1 pb-0 hover:rounded-xl hover:border hover:border-cyan-500">
      <div className="pointer-events-none absolute left-1 right-1 top-1 z-[5] aspect-[2/3] rounded-xl group-hover:bg-gradient-to-t group-hover:from-cyan-500/80 group-hover:via-cyan-500/50" />

      <ImagePlaceholder
        isVisible={true}
        width={342}
        height={513}
        className="z-[4] aspect-[2/3] w-full rounded-xl"
      />

      <div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden px-1 py-2">
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row">
          <TextBlockSkeleton className="w-12" />
          <TextBlockSkeleton className="w-16" />
        </div>
        <TextBlockSkeleton className="w-full" />
      </div>
    </div>
  );
}
