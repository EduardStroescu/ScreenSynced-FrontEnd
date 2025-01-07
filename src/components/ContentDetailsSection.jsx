import { BookmarkIcon } from "@components/Icons";
import { placeholderImage } from "@lib/placeholders";
import PropTypes from "prop-types";

export function ContentDetailsSection({ queryData, contentDetails }) {
  const contentImage =
    contentDetails?.poster_path !== null ||
    contentDetails?.backdrop_path !== null
      ? "https://image.tmdb.org/t/p/w342" + contentDetails.poster_path ||
        "https://image.tmdb.org/t/p/w300" + contentDetails.backdrop_path
      : placeholderImage;

  const director = queryData.credits?.crew?.find(
    (crew) => crew.job === "Director",
  );

  const directorImage =
    director?.profile_path !== null && director?.profile_path !== undefined
      ? "https://image.tmdb.org/t/p/w185" + director?.profile_path
      : placeholderImage;

  return (
    <article className="flex flex-col rounded-xl bg-[#131E2E] sm:flex-row">
      <img
        src={contentImage}
        alt=""
        className="m-1 rounded-xl object-cover sm:w-[17rem]"
      />
      <div className="m-1 flex w-[calc(100%-8px)] flex-col items-start gap-4 rounded-xl bg-[#070B11] px-2 py-6 sm:m-1 sm:px-4">
        <div className="flex flex-row gap-1 font-serif">
          <span>{contentDetails.original_language?.toUpperCase()}</span> |{" "}
          <span className="self-center">
            <BookmarkIcon className="w-[0.7rem]" />
          </span>
          <span>{contentDetails.vote_average?.toFixed(1)}</span> |{" "}
          <span>
            {contentDetails.release_date?.slice(0, 4) ||
              contentDetails.first_air_date?.slice(0, 4) ||
              "unknown"}
          </span>
          |{" "}
          <span>
            {contentDetails.runtime ||
              contentDetails.episode_run_time?.[0] ||
              0}{" "}
            min
          </span>
        </div>
        <h2 className="font-londrina text-4xl">{contentDetails.title}</h2>
        <div className="font-serif">
          <p className="pb-2 text-cyan-500">Description:</p>
          <p>{contentDetails.overview}</p>
        </div>
        {!!contentDetails.genres.length && (
          <div className="flex flex-row gap-2">
            <p className="text-cyan-500">Genres:</p>
            {contentDetails.genres.map((genre, index) => {
              return <p key={index}>{genre.name}</p>;
            })}
          </div>
        )}
        {director && (
          <div className="flex flex-row items-center gap-2">
            <p className="text-cyan-500">Director:</p>
            <img
              src={directorImage}
              alt="Director Image"
              className="aspect-[1/1] w-[3rem] rounded-full object-cover"
            />
            <span className="text-white">{director.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}

ContentDetailsSection.propTypes = {
  queryData: PropTypes.shape({
    credits: PropTypes.shape({
      crew: PropTypes.arrayOf(
        PropTypes.shape({
          credit_id: PropTypes.string,
          gender: PropTypes.number,
          id: PropTypes.number,
          job: PropTypes.string,
          name: PropTypes.string,
          original_name: PropTypes.string,
          profile_path: PropTypes.string,
        }),
      ),
    }),
  }),
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
