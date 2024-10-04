import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  fetchCarouselMovieVideos,
  fetchCarouselSeriesVideos,
} from "../api/tmdb/QueryFunctions";
import { getYoutubeLinks } from "../lib/utils";

import PropTypes from "prop-types";
import { Suspense, useState } from "react";
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/navigation";
import { imagePrefixOriginal } from "../lib/const";
import { placeholderImage } from "../lib/placeholders";
import { contentItemPropTypes } from "../lib/types";
import { AddBookmarkButton } from "./AddBookmarkButton";
import { PlayIcon } from "./Icons";
import { Image } from "./Image";

export function FeaturedTitlesCarousel({ contentType, apiData, queryType }) {
  const [activeVideo, setActiveVideo] = useState(0);

  const slicedResults = apiData?.results?.slice(0, 5);
  const contentIds = slicedResults?.map((movie) => [movie.id]);

  const queryContent = {
    movies: {
      queries: contentIds?.map((id) => ({
        queryKey: ["movieId", id],
        queryFn: () => fetchCarouselMovieVideos(id),
      })),
    },
    series: {
      queries: contentIds?.map((id) => ({
        queryKey: ["serieId", id],
        queryFn: () => fetchCarouselSeriesVideos(id),
      })),
    },
  };

  const contentVideos = useQueries(queryContent[queryType]);
  const videoIds = contentVideos.map(
    (content) =>
      content.data?.results?.find((type) => type.type === "Trailer")?.key,
  );

  const youtubeLink = getYoutubeLinks(videoIds);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden sm:h-[45rem]">
      <div className="pointer-events-none absolute z-[100] h-full w-full overflow-hidden">
        <YoutubePlayer video={youtubeLink[activeVideo]} />
      </div>
      <Swiper
        onRealIndexChange={(swiper) => setActiveVideo(swiper.realIndex)}
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: true,
        }}
        loop={true}
        navigation={false}
        modules={[Autoplay, Pagination]}
        className="z-[104]"
      >
        {apiData?.results?.slice(0, 5).map((content) => {
          const contentImage =
            content.poster_path !== null && content.poster_path !== undefined
              ? imagePrefixOriginal + content.poster_path
              : content.backdrop_path !== null &&
                  content.backdrop_path !== undefined
                ? imagePrefixOriginal + content.backdrop_path
                : placeholderImage;

          return (
            <SwiperSlide
              key={content?.id}
              className="relative z-[105] h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
            >
              <Image
                as={motion.img}
                motionProps={{
                  initial: { opacity: 1 },
                  animate: { opacity: youtubeLink ? 0 : 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 1, delay: 5 },
                }}
                isInView={true}
                src={contentImage}
                alt={content?.title || content?.name}
                width={2000}
                height={3000}
                className={"fixed h-full w-full object-cover lg:h-auto"}
                placeholderClassName={
                  "fixed w-full h-full object-cover lg:h-auto"
                }
              />
              <div className="absolute bottom-0 left-0 z-[100] h-[30rem] w-full bg-gradient-to-t from-[#070B11] via-[#070B11]/80 to-[#070B11]/0" />
              <section className="z-[104] flex flex-col gap-4 self-end sm:gap-8">
                <h1 className="pointer-events-none font-londrina text-4xl uppercase sm:text-6xl">
                  {content?.title || content?.name}
                </h1>
                <h2 className="pointer-events-none px-2 font-serif text-xs font-bold lg:px-32 lg:text-base">
                  {`${content.overview.slice(0, 250)}...`}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    to={`/${contentType}/$movieId`}
                    params={{
                      movieId: content.id,
                    }}
                    className="flex items-center justify-center gap-2 rounded-full border bg-cyan-500 px-2 py-1 hover:bg-cyan-600 sm:px-6"
                  >
                    <p>Watch Now</p>
                    <PlayIcon />
                  </Link>
                  <AddBookmarkButton
                    size={"w-4"}
                    className={
                      "group flex items-center justify-center gap-2 rounded-full border border-cyan-500 px-2 py-1 hover:bg-cyan-500 sm:px-4"
                    }
                    contentId={content?.id}
                    mediaType={content?.mediaType}
                  >
                    <span>Add Bookmark</span>
                  </AddBookmarkButton>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

function YoutubePlayer({ video }) {
  return (
    <Suspense>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: 5 }}
          className="pointer-events-none absolute -left-[18rem] -top-[103%] z-[103] h-[300%] w-[300%] -translate-y-20 cursor-pointer overflow-hidden sm:-left-[40%] sm:-top-[20rem] sm:h-[180%] sm:w-[180%] md:-top-[15rem] lg:-left-[25%] lg:-top-[12rem] lg:h-[150%] lg:w-[150%] xl:-top-[6rem]"
        >
          <ReactPlayer
            url={video}
            loop
            width="100%"
            height="100%"
            playing={true}
            muted={true}
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
          />
        </motion.div>
      )}
    </Suspense>
  );
}

FeaturedTitlesCarousel.propTypes = {
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  queryType: PropTypes.oneOf(["movies", "series"]).isRequired,
  apiData: PropTypes.shape({
    results: PropTypes.arrayOf(contentItemPropTypes).isRequired,
  }),
};

YoutubePlayer.propTypes = {
  video: PropTypes.string,
};
