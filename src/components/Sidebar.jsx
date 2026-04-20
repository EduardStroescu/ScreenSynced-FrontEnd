import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { Image } from "@components/Image";
import { cn } from "@lib/cn";
import { SELECTABLE_DATES } from "@lib/const";
import { getContentImageUrl } from "@lib/utils";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import PropTypes from "prop-types";
import { memo, useRef, useState } from "react";

const RESULTS_LIMIT = 10;

export function Sidebar({ contentType, upcomingData }) {
  const [date, setDate] = useState("week");
  const isInViewRef = useRef();

  const isInView = useInView(isInViewRef, { once: true, amount: 0 });

  const contentQuery =
    contentType === "movie" ? upcomingData?.movies : upcomingData?.tv;

  const upcomingList = contentQuery?.[date]?.results?.slice(0, RESULTS_LIMIT);

  return (
    <aside className="col-span-1 my-6 hidden px-2 lg:px-4 xl:block">
      <header className="flex flex-col items-center justify-between gap-4 pb-6 lg:flex-row lg:gap-0">
        <h2 className="text-2xl text-cyan-500">
          Upcoming {contentType === "movie" ? "Movies" : "Series"}
        </h2>
        <div className="flex gap-1 lg:flex-row">
          {SELECTABLE_DATES.map((selectableDate) => {
            return (
              <button
                key={selectableDate}
                onClick={() => setDate(selectableDate)}
                className={cn(
                  "rounded px-2 py-1 text-sm capitalize",
                  date === selectableDate && "bg-cyan-500",
                )}
              >
                {selectableDate}
              </button>
            );
          })}
        </div>
      </header>
      <AnimatePresence>
        <ul ref={isInViewRef} className="grid grid-cols-1 gap-2">
          {!!upcomingList?.length &&
            upcomingList.map((content, index) => (
              <motion.li
                key={content.id}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.25,
                  delay: index / 6,
                }}
                className="group col-span-1 flex w-full items-center justify-start rounded-xl border-r-2 border-cyan-500 bg-[#131E2E] text-left"
              >
                {content?.mediaType === "movie" || contentType === "movie" ? (
                  <Content
                    index={index}
                    linkTo="/movie/$movieId"
                    linkParams={{ movieId: content?.id }}
                    contentId={content?.id}
                    contentImage={getContentImageUrl(content, "small", "small")}
                    contentTitle={content?.title}
                    contentReleaseDate={content?.release_date}
                    contentType={content?.mediaType || contentType}
                    isInView={isInView}
                  />
                ) : (
                  <Content
                    index={index}
                    linkTo="/tv/$tvId"
                    linkParams={{ tvId: content?.id }}
                    contentId={content?.id}
                    contentImage={getContentImageUrl(content, "small", "small")}
                    contentTitle={content?.name || "N/A"}
                    contentReleaseDate={content?.first_air_date || "N/A"}
                    contentType={content?.mediaType || contentType}
                    isInView={isInView}
                  />
                )}
              </motion.li>
            ))}
          {!upcomingList?.length && (
            <li className="col-span-1 flex h-[122px] w-full items-center justify-center rounded-xl border-r-2 border-cyan-500 bg-[#131E2E] px-2 py-6 text-center">
              <p className="font-londrina text-4xl">
                No new releases at this time.
              </p>
            </li>
          )}
        </ul>
      </AnimatePresence>
    </aside>
  );
}

const Content = memo(
  ({
    index,
    linkTo,
    linkParams,
    contentId,
    contentImage,
    contentTitle,
    contentReleaseDate,
    contentType,
    isInView,
  }) => {
    const isFirst = index === 0;
    const isSecond = index === 1;
    const isThird = index === 2;

    return (
      <>
        <div className="flex w-12 items-center justify-center px-8 text-center">
          <p
            className={cn(
              "text-center font-londrina text-5xl",
              isFirst && "text-red-500",
              isSecond && "text-blue-400",
              isThird && "text-yellow-500",
            )}
          >
            {index + 1}
          </p>
        </div>
        <div className="flex w-full flex-row items-center gap-2 overflow-hidden">
          <Link
            aria-label={`Link to ${contentTitle}`}
            to={linkTo}
            params={linkParams}
            className="aspect-[2/3] w-1/5"
          >
            <Image
              isInView={isInView}
              src={contentImage}
              alt={`${contentTitle} poster`}
              width={185}
              height={278}
              imageClassName="aspect-[2/3]"
            />
          </Link>
          <div className="flex w-[78%] flex-col p-2">
            <Link
              aria-label={`Link to ${contentTitle}`}
              to={linkTo}
              params={linkParams}
              className="w-full truncate font-sans text-lg transition-colors duration-300 ease-in-out group-hover:text-cyan-500"
            >
              {contentTitle}
            </Link>
            <div className="flex flex-row gap-1 text-xs">
              <AddBookmarkButton
                className="w-[0.7rem]"
                contentId={contentId}
                mediaType={contentType}
              />
              <p>{contentReleaseDate}</p>
            </div>
          </div>
        </div>
      </>
    );
  },
);

Content.displayName = "Content";

Content.propTypes = {
  index: PropTypes.number.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkParams: PropTypes.object.isRequired,
  contentId: PropTypes.number.isRequired,
  contentImage: PropTypes.string.isRequired,
  contentTitle: PropTypes.string,
  contentReleaseDate: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  isInView: PropTypes.bool.isRequired,
};

Sidebar.propTypes = {
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  upcomingData: PropTypes.shape({
    movies: PropTypes.shape({
      results: PropTypes.array,
    }),
    tv: PropTypes.shape({
      results: PropTypes.array,
    }),
  }),
};
