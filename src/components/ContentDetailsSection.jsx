import { BookmarkIcon } from "@components/Icons";
import { getContentImageUrl, getCastImageUrl } from "@lib/utils";
import PropTypes from "prop-types";

export function ContentDetailsSection({ contentDetails }) {
  const director = contentDetails?.credits?.crew?.find(
    (crew) => crew.known_for_department === "Directing",
  );

  return (
    <article className="flex flex-col rounded-xl bg-[#131E2E] sm:flex-row">
      <img
        src={getContentImageUrl(contentDetails, "medium", "small")}
        alt={`${contentDetails?.title || contentDetails?.name} poster`}
        className="m-1 rounded-xl object-cover sm:w-[17rem]"
      />
      <div className="m-1 flex w-[calc(100%-8px)] flex-col items-start gap-4 rounded-xl bg-[#070B11] px-2 py-6 sm:m-1 sm:px-4">
        {contentDetails?.contentType === "movie" ? (
          <Details
            contentLanguage={contentDetails?.original_language?.toUpperCase()}
            contentVoteAvg={contentDetails?.vote_average.toFixed(1)}
            contentReleaseDate={contentDetails?.release_date?.slice(0, 4)}
            contentDuration={contentDetails?.runtime}
            contentTitle={contentDetails?.title}
          />
        ) : (
          <Details
            contentLanguage={contentDetails?.original_language?.toUpperCase()}
            contentVoteAvg={contentDetails?.vote_average.toFixed(1)}
            contentReleaseDate={contentDetails?.first_air_date?.slice(0, 4)}
            contentDuration={
              contentDetails?.episode_run_time?.[0] ||
              contentDetails?.last_episode_to_air?.runtime
            }
            contentTitle={contentDetails?.name}
          />
        )}
        <div className="font-serif">
          <p className="pb-2 text-cyan-500">Description:</p>
          <p>{contentDetails.overview}</p>
        </div>
        {!!contentDetails?.genres?.length && (
          <div className="flex flex-row gap-2">
            <p className="text-cyan-500">Genres:</p>
            {contentDetails?.genres?.map((genre, index) => {
              return <p key={index}>{genre.name}</p>;
            })}
          </div>
        )}
        {director && (
          <div className="flex flex-row items-center gap-2">
            <p className="text-cyan-500">Director:</p>
            <img
              src={getCastImageUrl(director)}
              alt="Director Image"
              className="aspect-[1/1] w-[3rem] rounded-full object-cover"
            />
            <span className="text-white">{director?.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function Details({
  contentLanguage,
  contentVoteAvg,
  contentReleaseDate,
  contentDuration,
  contentTitle,
}) {
  return (
    <>
      <div className="flex flex-row gap-1 font-serif">
        <span>{contentLanguage}</span> |{" "}
        <span className="self-center">
          <BookmarkIcon className="w-[0.7rem]" />
        </span>
        <span>{contentVoteAvg}</span> |{" "}
        <span>{contentReleaseDate || "N/A"}</span>|{" "}
        <span>{contentDuration ? contentDuration + " min" : "N/A"}</span>
      </div>
      <h2 className="font-londrina text-4xl">{contentTitle}</h2>
    </>
  );
}

Details.propTypes = {
  contentLanguage: PropTypes.string,
  contentVoteAvg: PropTypes.string,
  contentReleaseDate: PropTypes.string,
  contentDuration: PropTypes.number,
  contentTitle: PropTypes.string,
};

ContentDetailsSection.propTypes = {
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
      runtime: PropTypes.number,
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
    contentType: PropTypes.string.isRequired,
  }).isRequired,
};
