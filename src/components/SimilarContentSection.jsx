import { ContentCard } from "@components/ContentCard";
import PropTypes from "prop-types";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function SimilarContentSection({ similarContent, mediaType }) {
  if (!similarContent?.length) return;

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
          {similarContent.map((content, index) => {
            return (
              <SwiperSlide
                key={content?.id ?? index}
                className="w-[8rem] overflow-hidden sm:w-[11rem] lg:w-[15rem]"
              >
                <ContentCard
                  contentType={mediaType}
                  content={content}
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

SimilarContentSection.propTypes = {
  similarContent: PropTypes.arrayOf(PropTypes.object).isRequired,
  mediaType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
