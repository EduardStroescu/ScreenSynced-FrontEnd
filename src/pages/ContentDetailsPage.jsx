import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AddBookmarkButton, BookmarkIcon, ContentCard } from "../components";
import { getYoutubeLink } from "../lib/utils";

export function ContentDetailsPage() {
  const { queryOptions } = useRouteContext();
  const { data: queryData } = useQuery(queryOptions);
  const data = queryData?.contentDetails;

  return (
    <section className="grid w-full gap-4 px-2 py-16 sm:grid-cols-6 sm:px-6 sm:py-20">
      <div
        className={`${
          data.seasons ? "col-span-6 xl:col-span-5" : "col-span-6"
        } grid h-full w-full grid-flow-row gap-4`}
      >
        <PlayerSection data={data} />
        <ContentDetails queryData={queryData} data={data} />
      </div>
      <SeasonsSection data={data} />
      <CastSection queryData={queryData} />
      <SimilarSection queryData={queryData} />
    </section>
  );
}

function PlayerSection({ data }) {
  const videoIds = data?.videos?.results?.find(
    (type) => type.type === "Trailer",
  )?.key;

  const youtubeLink = getYoutubeLink(videoIds);
  return (
    <section className="flex h-[500px] w-full flex-col lg:h-[800px]">
      {youtubeLink && (
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
      )}
      <div className="text-serif flex flex-row gap-4 rounded-b-xl bg-[#131E2E] py-2 pl-4 text-xs sm:px-4 sm:text-sm">
        <AddBookmarkButton
          contentId={data.id}
          size={"w-[0.7rem]"}
          className={"flex flex-row items-center justify-center gap-1"}
          mediaType={"movie"}
        >
          Add Bookmark
        </AddBookmarkButton>
      </div>
    </section>
  );
}

function ContentDetails({ queryData, data }) {
  const contentImage =
    data.poster_path !== null || data.backdrop_path !== null
      ? "https://image.tmdb.org/t/p/w342" + data.poster_path ||
        "https://image.tmdb.org/t/p/w300" + data.backdrop_path
      : "https://placehold.co/400x400/070B11/06b6d4?text=A+picture+is+worth\\na+thousand+words,\\nbut+not+today.&font=sans";

  const director = queryData.credits.crew.find(
    (crew) => crew.job === "Director",
  );
  const directorImage =
    director?.profile_path !== null && director?.profile_path !== undefined
      ? "https://image.tmdb.org/t/p/w185" + director.profile_path
      : "https://placehold.co/400x400/070B11/06b6d4?text=A+picture+is+worth\\na+thousand+words,\\nbut+not+today.&font=sans";
  return (
    <article className="flex flex-col rounded-xl bg-[#131E2E] sm:flex-row">
      <img
        src={contentImage}
        alt=""
        className="m-1 rounded-xl object-cover sm:w-[17rem]"
      />
      <div className="m-1 flex w-[calc(100%-8px)] flex-col items-start gap-4 rounded-xl bg-[#070B11] px-2 py-6 sm:m-1 sm:px-4">
        <div className="flex flex-row gap-1 font-serif">
          {data.original_language.toUpperCase()} |{" "}
          <BookmarkIcon className="w-[0.7rem]" />
          {data.vote_average.toFixed(1)} |{" "}
          {data.release_date?.slice(0, 4) || data.first_air_date?.slice(0, 4)} |{" "}
          {data.runtime || data.episode_run_time[0]} min
        </div>
        <h2 className="font-londrina text-4xl">{data.title}</h2>
        <div className="font-serif">
          <p className="pb-2 text-cyan-500">Description:</p>
          <p>{data.overview}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-cyan-500">Genres:</p>
          {data.genres.map((genre, index) => {
            return (
              <Link
                key={index}
                to="/genres/$genreId"
                className="hover:text-cyan-500"
              >
                {genre.name}
              </Link>
            );
          })}
        </div>
        {director && (
          <div className="flex flex-row items-center gap-2">
            <p className="text-cyan-500">Director:</p>
            <img
              src={directorImage}
              alt="Director Image"
              className="aspect-[1/1] w-[3rem] rounded-full object-cover"
            />
            <span className="text-white">{director?.name} </span>
          </div>
        )}
      </div>
    </article>
  );
}

function SeasonsSection({ data }) {
  const [selectedSeason, setSelectedSeason] = useState(
    data?.seasons?.find((season) => season?.season_number === 1),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      {data.seasons && (
        <aside className="col-span-6 flex w-full flex-col items-center rounded-xl bg-[#131E2E] p-4 xl:col-span-1">
          <ul className="border-rounded-sm flex w-full flex-col gap-2 border-b-2 border-cyan-500 pb-2">
            <button
              onClick={() => setIsDropdownOpen((x) => !x)}
              className="border-rounded-sm flex flex-row items-center justify-center gap-2 rounded-xl border-b-2 border-cyan-500 bg-[#070B11] py-1 pl-4"
            >
              {selectedSeason.name}
              <i
                className={`${
                  isDropdownOpen ? "rotate-[225deg]" : "rotate-45"
                } border-b-2 border-r-2 border-white p-[3px]`}
              />
            </button>
            {data.seasons.map((season) => {
              return (
                <li
                  key={season.id}
                  className={`${
                    isDropdownOpen ? "flex" : "hidden"
                  } w-full flex-col gap-1 rounded-xl text-center`}
                >
                  <button
                    onClick={() => {
                      setSelectedSeason(season);
                      setIsDropdownOpen(false);
                    }}
                    className={` ${
                      season.id === selectedSeason.id
                        ? "bg-cyan-500"
                        : "bg-[#070B11]"
                    } rounded-xl py-1`}
                  >
                    {season.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {selectedSeason && (
            <ul className="flex w-full flex-col gap-1 pt-2 text-center">
              {Array.from(
                { length: selectedSeason.episode_count },
                (_, index) => index,
              )?.map((index) => {
                const normalizedIndex = index + 1;
                return (
                  <li key={normalizedIndex} className="rounded-xl bg-[#070B11]">
                    <Link>Episode {normalizedIndex}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      )}
    </>
  );
}

function CastSection({ queryData }) {
  const filteredActors = queryData.credits.cast.filter(
    (actor) => actor.known_for_department === "Acting",
  );
  return (
    <section className="col-span-6 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
        {filteredActors.slice(0, 10).map((cast) => {
          const castImage =
            cast.profile_path !== null && cast.profile_path !== undefined
              ? "https://image.tmdb.org/t/p/w185" + cast.profile_path
              : "https://placehold.co/400x400/070B11/06b6d4?text=A+picture+is+worth\\na+thousand+words,\\nbut+not+today.&font=sans";
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
            ? queryData?.similarMovies
            : queryData?.similarSeries
          ).results.map((movie, index) => {
            return (
              <SwiperSlide
                key={movie?.id ? movie?.id : index}
                className="w-[8rem] overflow-hidden sm:w-[11rem] lg:w-[15rem]"
              >
                <ContentCard
                  contentType={queryData?.similarMovies ? "movie" : "tv"}
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
