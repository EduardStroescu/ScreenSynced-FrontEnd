import { ContentCard } from "@components/ContentCard";
import PropTypes from "prop-types";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function SimilarContentSection({ similarContent, mediaType }) {
  if (!similarContent?.length) return;

  return (
    <section className="col-span-6 flex flex-col gap-4 overflow-hidden rounded-xl border-4 border-[#131E2E] p-4">
      <header className="ml-1 flex text-cyan-500">
        <h3 className="text-3xl">You may also like:</h3>
      </header>
      <Swiper
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        style={{
          "--swiper-navigation-color": "#06b6d4",
          "--swiper-navigation-top-offset": "40%",
        }}
        slidesPerView={"auto"}
        centerInsufficientSlides={true}
        centeredSlides={false}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={8}
      >
        {similarContent.map((content, index) => {
          return (
            <SwiperSlide
              key={content?.id ?? index}
              className="h-full w-[11rem] cursor-grab overflow-hidden active:cursor-grabbing lg:w-[15rem]"
            >
              <ContentCard
                contentType={mediaType}
                content={content}
                index={index}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

SimilarContentSection.propTypes = {
  similarContent: PropTypes.arrayOf(PropTypes.object).isRequired,
  mediaType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
