import { useSeasonsQuery } from "@lib/queries";
import { useParams } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useState } from "react";

export function SeasonsSection({ seasons }) {
  const tvId = useParams({
    from: "/tv/$tvId",
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
    <aside
      data-lenis-prevent
      className="col-span-6 flex max-h-[1300px] w-full flex-col items-center overflow-auto rounded-xl bg-[#131E2E] p-4 xl:col-span-1"
    >
      <div className="border-rounded-sm relative flex w-full flex-col gap-4">
        <button
          onClick={() => setIsDropdownOpen((x) => !x)}
          aria-expanded={isDropdownOpen}
          aria-label={`Select season. Current selected season: ${selectedSeason.name}`}
          className="border-rounded-sm flex flex-row items-center justify-center gap-2 rounded-xl border-b-2 border-cyan-500 bg-[#070B11] py-1"
        >
          {selectedSeason.name}
          <i
            className={`${
              isDropdownOpen ? "rotate-[225deg]" : "rotate-45"
            } border-b-2 border-r-2 border-white p-[3px]`}
          />
        </button>
        <div className="border-b-2 border-cyan-500" />
        <ul className="flex flex-col gap-1">
          {seasons.map((season) => {
            return (
              <li
                key={season.id}
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } w-full rounded-xl text-center`}
              >
                <button
                  onClick={() => {
                    setSelectedSeason(season);
                    setIsDropdownOpen(false);
                  }}
                  className={` ${
                    season.id === selectedSeason.id
                      ? "bg-cyan-500"
                      : "bg-[#070B11] hover:bg-cyan-500"
                  } w-full rounded-xl py-1`}
                >
                  {season.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {!isDropdownOpen && selectedSeason && (
        <ul className="flex w-full flex-col gap-1 text-center ">
          {seasonsData?.episodes?.map((episode) => {
            return (
              <li
                key={episode?.id}
                className="rounded-xl bg-[#070B11] py-1 hover:bg-cyan-500"
              >
                <button className="w-full">
                  {episode?.episode_number}: {episode?.name}
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
