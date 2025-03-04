import { ContentCard } from "@components/ContentCard";
import { getBookmarksQueryConfig } from "@lib/queryConfigsForRoutes";
import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import PropTypes from "prop-types";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Bookmarks({ bookmarksData = [] }) {
  const bookmarksByType = bookmarksData.reduce(
    (acc, bookmark) => {
      acc[bookmark.mediaType].push(bookmark.mediaId);
      return acc;
    },
    { movie: [], tv: [] },
  );
  const queryConfig = getBookmarksQueryConfig(bookmarksByType);
  const movieBookmarkDetails = useQueries(queryConfig.movies);
  const tvBookmarkDetails = useQueries(queryConfig.series);

  const movieBookmarksDetailsData = movieBookmarkDetails
    ?.map((bookmark) => bookmark.data)
    ?.filter(Boolean);
  const tvBookmarksDetailsData = tvBookmarkDetails
    ?.map((bookmark) => bookmark?.data)
    ?.filter(Boolean);

  const hasNoBookmarks =
    !movieBookmarksDetailsData?.length && !tvBookmarksDetailsData?.length;

  return (
    <section className="col-span-6 w-full rounded-xl py-4 sm:col-span-3 sm:py-0">
      <header className="flex flex-row items-center justify-start pb-4">
        <h2 className="py-1 text-2xl">Bookmarks</h2>
      </header>
      {hasNoBookmarks && (
        <div className="ml-2 flex items-center gap-4">
          <p className="text-red-500">None added yet</p>
          <Link
            to="/discover/1"
            search={{ contentType: "movies", genres: "action" }}
            className="rounded bg-cyan-500 px-2 py-1 hover:bg-cyan-600"
          >
            Discover Now
          </Link>
        </div>
      )}
      {!!movieBookmarksDetailsData?.length && (
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
              {movieBookmarksDetailsData.map((bookmark, index) => {
                return (
                  <SwiperSlide
                    key={bookmark?.id ?? index}
                    className="w-[8rem] sm:w-[10rem] lg:min-w-[15rem]"
                  >
                    <ContentCard contentType="movie" content={bookmark} />
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </article>
      )}
      {!!tvBookmarksDetailsData?.length && (
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
              {tvBookmarksDetailsData.map((bookmark, index) => {
                return (
                  <SwiperSlide
                    key={bookmark?.id ?? index}
                    className="w-[8rem] sm:w-[10rem] lg:min-w-[15rem]"
                  >
                    <ContentCard contentType="tv" content={bookmark} />
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </article>
      )}
    </section>
  );
}

Bookmarks.propTypes = {
  bookmarksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      mediaId: PropTypes.number,
      mediaType: PropTypes.oneOf(["tv", "movie"]),
      userId: PropTypes.number,
    }),
  ),
};
