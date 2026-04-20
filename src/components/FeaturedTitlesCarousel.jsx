import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { memo, useCallback, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getContentImageUrl, getYoutubeLinks } from "../lib/utils";
import PropTypes from "prop-types";

import { contentItemPropTypes } from "@lib/types";

import { useContentVideos } from "@lib/queries";
import { AddBookmarkButton } from "./AddBookmarkButton";
import { PlayIcon } from "./Icons";
import { Image } from "./Image";
import { CarouselPlayer } from "@components/CarouselPlayer";

const VIDEO_CAROUSEL_LIMIT = 5;
const CONTENT_DESCRIPTION_LENGTH = 240;

export function FeaturedTitlesCarousel({ apiData, queryType }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const swiperRef = useRef(null);

  const slicedResults = apiData.slice(0, VIDEO_CAROUSEL_LIMIT);
  const contentIds = slicedResults.map((movie) => movie.id);

  const contentVideos = useContentVideos(contentIds, queryType);
  const videoIds = contentVideos.map(
    (content) =>
      content?.data?.results?.find((type) => type.type === "Trailer")?.key,
  );
  const youtubeLinks = getYoutubeLinks(videoIds);

  const onPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  const onProgress = useCallback((playedSeconds, duration) => {
    if (!swiperRef?.current || !duration || duration <= 0) return;
    if (playedSeconds >= duration - 15) swiperRef.current.slideNext();
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden sm:h-[45rem]">
      <div className="pointer-events-none absolute z-[100] h-full w-full overflow-hidden">
        <CarouselPlayer
          video={youtubeLinks?.[activeSlide]}
          onProgress={onProgress}
          onPlay={onPlay}
          shouldDisplayVideo={isVideoPlaying}
        />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onRealIndexChange={(swiper) => {
          setIsVideoPlaying(false);
          setActiveSlide(swiper.realIndex);
        }}
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
        modules={[Autoplay]}
        style={{ zIndex: 104 }}
      >
        {slicedResults.map((content, idx) => (
          <SwiperSlide
            key={content?.id}
            className="relative z-[105] h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
          >
            {content.mediaType === "movie" ? (
              <Content
                linkTo="/movie/$movieId"
                linkParams={{
                  movieId: content?.id,
                }}
                shouldDisplayImage={!isVideoPlaying}
                contentId={content?.id}
                contentTitle={content?.title}
                contentImage={getContentImageUrl(
                  content,
                  "original",
                  "original",
                  "backdrop",
                )}
                contentOverview={content?.overview}
                isInView={activeSlide === idx}
              />
            ) : (
              <Content
                linkTo="/tv/$serieId"
                linkParams={{
                  serieId: content?.id,
                }}
                shouldDisplayImage={!isVideoPlaying}
                contentId={content?.id}
                contentTitle={content?.name}
                contentImage={getContentImageUrl(
                  content,
                  "original",
                  "original",
                  "backdrop",
                )}
                contentOverview={content?.overview}
                isInView={activeSlide === idx}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

const Content = memo(
  ({
    linkTo,
    linkParams,
    contentId,
    shouldDisplayImage,
    contentTitle,
    contentImage,
    contentOverview,
    isInView,
  }) => {
    return (
      <>
        <CarouselImage
          shouldDisplayImage={shouldDisplayImage}
          contentImage={contentImage}
          contentTitle={contentTitle}
          isInView={isInView}
        />

        <div className="absolute bottom-0 left-0 h-full w-full bg-[linear-gradient(to_top,rgba(7,11,17,1)_0%,rgba(7,11,17,0.98)_10%,rgba(7,11,17,0.8)_25%,rgba(7,11,17,0)_100%)]" />

        <section className="relative z-[104] flex flex-col items-center gap-4 self-end px-6 py-2">
          <h1 className="pointer-events-none font-londrina text-4xl uppercase leading-[0.9] sm:text-6xl sm:leading-[0.9]">
            {contentTitle}
          </h1>
          <p className="pointer-events-none w-full max-w-5xl font-serif text-xs font-bold lg:text-base">
            {contentOverview.length > CONTENT_DESCRIPTION_LENGTH
              ? `${contentOverview.slice(0, CONTENT_DESCRIPTION_LENGTH).trim()}...`
              : `${contentOverview}`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-full">
            <Link
              to={linkTo}
              params={linkParams}
              className="flex items-center justify-center gap-2 rounded-full border bg-cyan-500 px-2 py-1 transition-colors duration-300 ease-in-out hover:bg-cyan-600 sm:px-6"
            >
              <span className="truncate">Watch Now</span>
              <PlayIcon />
            </Link>
            <AddBookmarkButton
              iconSize={"w-4"}
              className={
                "group flex items-center justify-center gap-2 rounded-full border border-cyan-500 px-2 py-1 backdrop-blur-sm transition-colors duration-300 ease-in-out hover:bg-cyan-500 sm:px-4"
              }
              contentId={contentId}
              mediaType="movie"
            >
              <span className="truncate">Add Bookmark</span>
            </AddBookmarkButton>
          </div>
        </section>
      </>
    );
  },
);

const CarouselImage = ({
  shouldDisplayImage = true,
  contentImage,
  contentTitle,
  isInView,
}) => {
  return (
    <Image
      as={motion.img}
      motionProps={{
        initial: { opacity: shouldDisplayImage ? 1 : 0 },
        animate: { opacity: !shouldDisplayImage ? 0 : 1 },
        exit: { opacity: 0 },
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      }}
      isInView={isInView}
      src={contentImage}
      alt={contentTitle}
      width={2000}
      height={3000}
      imageClassName="pointer-events-none absolute h-full w-full"
      placeholderClassName="animate-none border-0 object-[center_53%]"
    />
  );
};

Content.displayName = "MovieCarouselContent";

FeaturedTitlesCarousel.propTypes = {
  queryType: PropTypes.oneOf(["movies", "series"]).isRequired,
  apiData: PropTypes.arrayOf(contentItemPropTypes).isRequired,
};

Content.propTypes = {
  linkTo: PropTypes.string.isRequired,
  linkParams: PropTypes.object.isRequired,
  contentId: PropTypes.number.isRequired,
  shouldDisplayImage: PropTypes.bool.isRequired,
  contentTitle: PropTypes.string.isRequired,
  contentImage: PropTypes.string.isRequired,
  contentOverview: PropTypes.string.isRequired,
  isInView: PropTypes.bool.isRequired,
};

CarouselImage.propTypes = {
  shouldDisplayImage: PropTypes.bool.isRequired,
  contentImage: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  isInView: PropTypes.bool.isRequired,
};
