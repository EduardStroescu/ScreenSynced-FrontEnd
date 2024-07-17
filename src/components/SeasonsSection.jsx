import PropTypes from "prop-types";
import { useState } from "react";

export function SeasonsSection({ contentDetails }) {
  const [selectedSeason, setSelectedSeason] = useState(
    contentDetails.seasons?.find((season) => season.season_number === 1),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!contentDetails.seasons) return;

  return (
    <aside
      data-lenis-prevent
      className="col-span-6 flex max-h-[1300px] w-full flex-col items-center overflow-auto rounded-xl bg-[#131E2E] p-4 xl:col-span-1"
    >
      <div className="border-rounded-sm relative flex w-full flex-col gap-4">
        <button
          onClick={() => setIsDropdownOpen((x) => !x)}
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
          {contentDetails?.seasons?.map((season) => {
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
          {Array.from(
            { length: selectedSeason.episode_count },
            (_, index) => index,
          )?.map((index) => {
            const normalizedIndex = index + 1;
            return (
              <li
                key={normalizedIndex}
                className="rounded-xl bg-[#070B11] py-1 hover:bg-cyan-500"
              >
                <button className="w-full">Episode {normalizedIndex}</button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

SeasonsSection.propTypes = {
  contentDetails: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    created_by: PropTypes.arrayOf(
      PropTypes.shape({
        credit_id: PropTypes.string,
        gender: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        original_name: PropTypes.string,
        profile_path: PropTypes.string,
      }),
    ),
    episode_run_time: PropTypes.arrayOf(PropTypes.number),
    first_air_date: PropTypes.string,
    belongs_to_collection: PropTypes.shape({
      backdrop_path: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    }),
    budget: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    homepage: PropTypes.string,
    id: PropTypes.number,
    in_production: PropTypes.bool,
    imdb_id: PropTypes.string,
    original_country: PropTypes.string,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        logo_path: PropTypes.string,
        name: PropTypes.string,
        origin_country: PropTypes.string,
      }),
    ),
    production_countries: PropTypes.arrayOf(
      PropTypes.shape({
        iso_3166_1: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    release_date: PropTypes.string,
    revenue: PropTypes.number,
    runtime: PropTypes.number,
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
    ),
    languages: PropTypes.arrayOf(PropTypes.string),
    lastAirDate: PropTypes.string,
    last_episode_to_air: PropTypes.shape({
      air_date: PropTypes.string,
      episode_number: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      overview: PropTypes.string,
      production_code: PropTypes.string,
      season_number: PropTypes.number,
      show_id: PropTypes.number,
      still_path: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    }),
    name: PropTypes.string,
    spoken_languages: PropTypes.arrayOf(
      PropTypes.shape({
        english_name: PropTypes.string,
        iso_639_1: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    networks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        logo_path: PropTypes.string,
        name: PropTypes.string,
        origin_country: PropTypes.string,
      }),
    ),
    next_episode_to_air: PropTypes.shape({
      air_date: PropTypes.string,
      episode_number: PropTypes.number,
      episode_type: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      overview: PropTypes.string,
      production_code: PropTypes.string,
      runtime: PropTypes.number,
      season_number: PropTypes.number,
      show_id: PropTypes.number,
      still_path: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    }),
    number_of_episodes: PropTypes.number,
    number_of_seasons: PropTypes.number,
    origin_country: PropTypes.arrayOf(PropTypes.string),
    original_name: PropTypes.string,
    status: PropTypes.string,
    tagline: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    video: PropTypes.bool,
    videos: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          iso_639_1: PropTypes.string,
          iso_3166_1: PropTypes.string,
          key: PropTypes.string,
          name: PropTypes.string,
          official: PropTypes.bool,
          pubblished_at: PropTypes.string,
          site: PropTypes.string,
          size: PropTypes.number,
          type: PropTypes.string,
        }),
      ),
    }),
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }).isRequired,
};
