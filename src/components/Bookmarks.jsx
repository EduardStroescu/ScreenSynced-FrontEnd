import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  fetchMovieDetails,
  fetchSerieDetails,
} from "../api/tmdb/QueryFunctions";
import { ContentCard } from "./";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Bookmarks() {
  const { queryBookmarks } = useRouteContext();
  const { data: bookmarksQuery } = useQuery(queryBookmarks);
  const movieBookmarksIds = bookmarksQuery?.response
    ?.filter((bookmark) => bookmark?.mediaType === "movie")
    ?.map((bookmark) => bookmark.mediaId);
  const tvBookmarksIds = bookmarksQuery?.response
    ?.filter((bookmark) => bookmark?.mediaType === "tv")
    ?.map((bookmark) => bookmark.mediaId);

  const queryContent = {
    movies: {
      queries: movieBookmarksIds
        ? movieBookmarksIds.map((id) => {
            return {
              queryKey: ["bookmarkDetails", id],
              queryFn: () => fetchMovieDetails(id),
            };
          })
        : [],
    },
    series: {
      queries: tvBookmarksIds
        ? tvBookmarksIds.map((id) => {
            return {
              queryKey: ["bookmarkDetails", id],
              queryFn: () => fetchSerieDetails(id),
            };
          })
        : [],
    },
  };

  const movieBookmarkDetails = useQueries(queryContent.movies);
  const tvBookmarkDetails = useQueries(queryContent.series);
  const movieBookmarksDetailsData = movieBookmarkDetails?.map(
    (bookmark) => bookmark.data,
  );
  const tvBookmarksDetailsData = tvBookmarkDetails?.map(
    (bookmark) => bookmark.data,
  );
  return (
    <section className="col-span-6 w-full rounded-xl py-4 sm:col-span-3 sm:py-0">
      <header className="flex flex-row items-center justify-start pb-4">
        <h2 className="py-1 text-2xl">Bookmarks</h2>
      </header>
      {movieBookmarksDetailsData.length && (
        <article>
          <header className="flex flex-row items-center justify-between gap-2 py-2 pl-4">
            <h3 className="py-1 text-2xl">Movies</h3>
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
              {movieBookmarksDetailsData?.map((bookmark, index) => {
                return (
                  <SwiperSlide
                    key={bookmark?.id ? bookmark?.id : index}
                    className="w-[8rem] sm:w-[10rem] lg:min-w-[15rem]"
                  >
                    <ContentCard
                      contentType={"movie"}
                      content={bookmark}
                      index={index}
                    />
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </article>
      )}
      {tvBookmarksDetailsData.length > 0 ? (
        <article>
          <header className="flex flex-row items-center justify-between py-4 pl-4">
            <h3 className="py-1 text-2xl">Series</h3>
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
            <div className="grid grid-cols-4 grid-rows-1 gap-2 px-4 lg:grid-cols-6 lg:grid-rows-1">
              {tvBookmarksDetailsData?.map((bookmark, index) => {
                return (
                  <SwiperSlide
                    key={bookmark?.id ? bookmark?.id : index}
                    className="w-[8rem] sm:w-[10rem] lg:min-w-[15rem]"
                  >
                    <ContentCard
                      contentType={"tv"}
                      content={bookmark}
                      index={index}
                    />
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </article>
      ) : null}
    </section>
  );
}
