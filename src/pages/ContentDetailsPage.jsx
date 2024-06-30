import { useState } from "react";
import ReactPlayer from "react-player";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AddBookmarkButton, BookmarkIcon, ContentCard } from "../components";
import { placeholderImage } from "../lib/placeholders";
import { getYoutubeLink } from "../lib/utils";

export function ContentDetailsPage({ queryData, contentDetails, mediaType }) {
  return (
    <section className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div
        className={`${
          contentDetails.seasons ? "col-span-6 xl:col-span-5" : "col-span-6"
        } grid h-full w-full grid-flow-row gap-4`}
      >
        <PlayerSection contentDetails={contentDetails} mediaType={mediaType} />
        <ContentDetails queryData={queryData} contentDetails={contentDetails} />
      </div>
      <SeasonsSection contentDetails={contentDetails} />
      <CastSection queryData={queryData} />
      <SimilarSection queryData={queryData} />
    </section>
  );
}

function PlayerSection({ contentDetails, mediaType }) {
  const videoIds = contentDetails.videos?.results?.find(
    (type) => type.type === "Trailer",
  )?.key;

  const youtubeLink = getYoutubeLink(videoIds);
  return (
    <section className="flex h-[500px] w-full flex-col lg:h-[800px]">
      {youtubeLink ? (
        <ReactPlayer
          url={youtubeLink}
          width="100%"
          height="100%"
          playing={false}
          controls
          muted={false}
          config={{
            youtube: {
              playerVars: {
                modestLogo: 1,
                rel: 0,
                start: 10,
                playsInline: 1,
                enablejsapi: 1,
                origin: import.meta.env.VITE_FRONTEND_URL,
              },
            },
          }}
          className={`h-full w-full cursor-pointer`}
        />
      ) : (
        <img
          src="/placeholders/placeholder-content.svg"
          className="h-[95%] w-full"
          loading="lazy"
        />
      )}
      <div className="text-serif flex flex-row gap-4 rounded-b-xl bg-[#131E2E] py-2 pl-4 text-xs sm:px-4 sm:text-sm">
        <AddBookmarkButton
          contentId={contentDetails?.id}
          mediaType={mediaType}
          size={"w-[0.7rem]"}
          className={"flex flex-row items-center justify-center gap-1"}
        >
          Add Bookmark
        </AddBookmarkButton>
      </div>
    </section>
  );
}

function ContentDetails({ queryData, contentDetails }) {
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
          {contentDetails.original_language?.toUpperCase()} |{" "}
          <BookmarkIcon className="w-[0.7rem]" />
          {contentDetails.vote_average?.toFixed(1)} |{" "}
          {contentDetails.release_date?.slice(0, 4) ||
            contentDetails.first_air_date?.slice(0, 4) ||
            "unknown"}{" "}
          |{" "}
          {contentDetails.runtime || contentDetails.episode_run_time?.[0] || 0}{" "}
          min
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
            <span className="text-white">{director.name} </span>
          </div>
        )}
      </div>
    </article>
  );
}

function SeasonsSection({ contentDetails }) {
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
          {contentDetails.seasons?.map((season) => {
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

function CastSection({ queryData }) {
  const filteredActors = queryData.credits?.cast?.filter(
    (actor) => actor.known_for_department === "Acting",
  );

  if (!queryData || !filteredActors.length) return;

  return (
    <section className="col-span-6 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
        {filteredActors?.slice(0, 10).map((cast) => {
          const castImage =
            cast.profile_path !== null && cast.profile_path !== undefined
              ? "https://image.tmdb.org/t/p/w185" + cast.profile_path
              : placeholderImage;
          return (
            <div
              key={cast.id}
              className="flex flex-row items-center gap-4 pl-1"
            >
              <img
                src={castImage}
                alt=""
                className="aspect-[1/1] w-[3rem] rounded-full object-cover"
              />
              <p>
                {cast.name} <span className="text-cyan-500">as</span>{" "}
                {cast.character}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SimilarSection({ queryData }) {
  if (
    !queryData.similarMovies?.results?.length &&
    !queryData.similarSeries?.results?.length
  )
    return;
  return (
    <section className="col-span-6 overflow-hidden rounded-xl border-4 border-[#131E2E] px-2 py-6 sm:px-4">
      <header className="flex pl-2 text-cyan-500">
        <h3 className="text-3xl">You may also like:</h3>
      </header>
      <Swiper
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        style={{
          "--swiper-navigation-color": "#06b6d4",
          "--swiper-pagination-color": "#06b6d4",
          "--swiper-navigation-top-offset": "40%",
        }}
        slidesPerView={"auto"}
        centerInsufficientSlides={true}
        centeredSlides={false}
        navigation={true}
        modules={[Navigation]}
      >
        <div className="grid lg:grid-cols-6 lg:grid-rows-1 lg:gap-2 lg:px-4">
          {(queryData.similarMovies
            ? queryData.similarMovies
            : queryData.similarSeries
          ).results.map((movie, index) => {
            return (
              <SwiperSlide
                key={movie?.id ? movie?.id : index}
                className="w-[8rem] overflow-hidden sm:w-[11rem] lg:w-[15rem]"
              >
                <ContentCard
                  contentType={queryData.similarMovies ? "movie" : "tv"}
                  content={movie}
                  index={index}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </section>
  );
}
