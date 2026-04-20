import { cn } from "@lib/cn";
import { useSeasonsQuery } from "@lib/queries";
import { useParams } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useState } from "react";

export function SeasonsSection({ seasons }) {
  const tvId = useParams({
    select: (params) => params.tvId,
  });
  const [selectedSeason, setSelectedSeason] = useState(() =>
    seasons?.find((season) => season.season_number === 1),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: seasonsData } = useSeasonsQuery(
    tvId,
    selectedSeason?.season_number,
  );

  if (!seasons || !seasons?.length) return null;

  return (
    <aside className="col-span-6 flex max-h-[408px] w-full flex-col items-center overflow-hidden rounded-xl bg-[#131E2E] xl:col-span-1 xl:max-h-[1432px]">
      <div
        className={cn(
          "border-rounded-sm relative flex w-full flex-col",
          isDropdownOpen && "h-full",
        )}
      >
        <button
          onClick={() => setIsDropdownOpen((x) => !x)}
          aria-expanded={isDropdownOpen}
          aria-label={`Select season. Current selected season: ${selectedSeason.name}`}
          className="border-rounded-sm flex flex-row items-center justify-center gap-2 rounded-xl border-b-2 border-t-2 border-cyan-500 bg-[#070B11] py-1"
        >
          {selectedSeason.name}
          <i
            className={cn(
              "border-b-2 border-r-2 border-white p-[3px] transition-transform duration-300 ease-in-out",
              isDropdownOpen ? "rotate-[225deg]" : "rotate-45",
            )}
          />
        </button>
        {isDropdownOpen && (
          <ul
            data-lenis-prevent
            className="flex h-full flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 pb-2 pt-2"
          >
            {seasons.map((season, idx) => {
              return (
                <li
                  key={season.id || idx}
                  className="w-full rounded-xl text-center"
                >
                  <button
                    title={season.name || "N/A"}
                    onClick={() => {
                      setSelectedSeason(season);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full truncate rounded-xl px-4 py-1",
                      season.id === selectedSeason.id
                        ? "bg-cyan-500"
                        : "bg-[#070B11] transition-colors duration-300 ease-in-out hover:bg-cyan-500",
                    )}
                  >
                    {season.name || "N/A"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {!isDropdownOpen && selectedSeason && (
        <ul
          data-lenis-prevent
          className="flex w-full flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 pb-2 pt-2 text-center"
        >
          {seasonsData?.episodes?.map((episode, idx) => {
            return (
              <li
                key={episode?.id || idx}
                className="rounded-xl bg-[#070B11] py-1 transition-colors duration-300 ease-in-out hover:bg-cyan-500"
              >
                <button
                  className="w-full truncate px-4"
                  title={`${episode?.episode_number}: ${episode?.name || "N/A"}`}
                >
                  {episode?.episode_number}: {episode?.name || "N/A"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

SeasonsSection.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      air_date: PropTypes.string,
      air_time: PropTypes.string,
      episode_count: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      season_number: PropTypes.number,
    }),
  ).isRequired,
};
