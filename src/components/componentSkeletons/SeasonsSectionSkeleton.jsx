import { TextBlockSkeleton } from "./TextBlockSkeleton";

const EPISODE_PLACEHOLDERS = Array.from({ length: 10 });

// TODO: Align this with the new design. Made the season switch button different, adjusted padding and scrollbar location
export function SeasonsSectionSkeleton() {
  return (
    <aside className="col-span-6 flex w-full flex-col items-center gap-4 overflow-auto rounded-xl bg-[#131E2E] p-4 xl:col-span-1">
      <div className="border-rounded-sm relative flex w-full flex-col gap-4">
        <div className="border-rounded-sm flex flex-row items-center justify-center gap-2 rounded-xl border-b-2 border-cyan-500 bg-[#070B11] py-1">
          <div className="flex flex-row items-center gap-1">
            <span>Season</span>
            <TextBlockSkeleton className="mt-0.5 w-4" />
          </div>
          <i className="rotate-45 border-b-2 border-r-2 border-white p-[3px] transition-transform duration-300 ease-in-out" />
        </div>
        <div className="border-b-2 border-cyan-500" />
      </div>

      <ul className="flex w-full flex-col gap-1 text-center">
        {EPISODE_PLACEHOLDERS.map((_, idx) => {
          return (
            <li key={idx + 1} className="rounded-xl bg-[#070B11] py-1">
              <div className="mx-auto flex max-w-40 flex-row items-center gap-2 px-2">
                {idx + 1}:
                <TextBlockSkeleton className="mt-0.5 w-full" />
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
