import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getContentImageUrl, getYoutubeLinks } from "../lib/utils";

import { contentItemPropTypes } from "@lib/types";

import { useContentVideos } from "@lib/queries";
import { AddBookmarkButton } from "./AddBookmarkButton";
import { PlayIcon } from "./Icons";
import { Image } from "./Image";
import { CarouselPlayer } from "@components/CarouselPlayer";

const VIDEO_CAROUSEL_LIMIT = 5;
const CONTENT_DESCRIPTION_LENGTH = 250;

export function FeaturedTitlesCarousel({ apiData, queryType }) {
  const [activeVideo, setActiveVideo] = useState(0);

  const slicedResults = apiData.slice(0, VIDEO_CAROUSEL_LIMIT);
  const contentIds = slicedResults.map((movie) => movie.id);

  const contentVideos = useContentVideos(contentIds, queryType);
  const videoIds = contentVideos.map(
    (content) =>
      content?.data?.results?.find((type) => type.type === "Trailer")?.key,
  );
  const youtubeLinks = getYoutubeLinks(videoIds);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden sm:h-[45rem]">
      <div className="pointer-events-none absolute z-[100] h-full w-full overflow-hidden">
        <CarouselPlayer video={youtubeLinks?.[activeVideo]} />
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
        style={{ zIndex: 104 }}
      >
        {slicedResults.map((content) => (
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
                shouldDisplayImage={!!youtubeLinks?.[activeVideo]}
                contentId={content?.id}
                contentTitle={content?.title}
                contentImage={getContentImageUrl(
                  content,
                  "original",
                  "original",
                )}
                contentOverview={content?.overview}
              />
            ) : (
              <Content
                linkTo="/tv/$serieId"
                linkParams={{
                  serieId: content?.id,
                }}
                shouldDisplayImage={!!youtubeLinks?.[activeVideo]}
                contentId={content?.id}
                contentTitle={content?.name}
                contentImage={getContentImageUrl(
                  content,
                  "original",
                  "original",
                )}
                contentOverview={content?.overview}
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
  }) => {
    return (
      <>
        <CarouselImage
          shouldDisplayImage={shouldDisplayImage}
          contentImage={contentImage}
          contentTitle={contentTitle}
        />
        <div className="absolute bottom-0 left-0 z-[100] h-[30rem] w-full bg-gradient-to-t from-[#070B11] via-[#070B11]/80 to-[#070B11]/0" />
        <section className="z-[104] flex flex-col gap-4 self-end sm:gap-8">
          <h1 className="pointer-events-none font-londrina text-4xl uppercase sm:text-6xl">
            {contentTitle}
          </h1>
          <h2 className="pointer-events-none px-2 font-serif text-xs font-bold lg:px-32 lg:text-base">
            {contentOverview.length > CONTENT_DESCRIPTION_LENGTH
              ? `${contentOverview.slice(0, CONTENT_DESCRIPTION_LENGTH)}...`
              : `${contentOverview}`}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <Link
              to={linkTo}
              params={linkParams}
              className="flex items-center justify-center gap-2 rounded-full border bg-cyan-500 px-2 py-1 hover:bg-cyan-600 sm:px-6"
            >
              <p>Watch Now</p>
              <PlayIcon />
            </Link>
            <AddBookmarkButton
              iconSize={"w-4"}
              className={
                "group flex items-center justify-center gap-2 rounded-full border border-cyan-500 px-2 py-1 hover:bg-cyan-500 sm:px-4"
              }
              contentId={contentId}
              mediaType="movie"
            >
              <span>Add Bookmark</span>
            </AddBookmarkButton>
          </div>
        </section>
      </>
    );
  },
);

const CarouselImage = memo(
  ({ shouldDisplayImage, contentImage, contentTitle }) => {
    return (
      <Image
        as={motion.img}
        motionProps={{
          initial: { opacity: 1 },
          animate: { opacity: shouldDisplayImage ? 0 : 1 },
          exit: { opacity: 0 },
          transition: {
            duration: 1,
            delay: shouldDisplayImage ? 5 : 0,
          },
        }}
        isInView={true}
        src={contentImage}
        alt={contentTitle}
        width={2000}
        height={3000}
        className={
          "pointer-events-none fixed h-full w-full object-cover lg:h-auto"
        }
        placeholderClassName={
          "fixed w-full h-full object-cover lg:h-auto pointer-events-none"
        }
      />
    );
  },
);

Content.displayName = "MovieCarouselContent";
CarouselImage.displayName = "CarouselImage";

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
};

CarouselImage.propTypes = {
  shouldDisplayImage: PropTypes.bool.isRequired,
  contentImage: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
};
