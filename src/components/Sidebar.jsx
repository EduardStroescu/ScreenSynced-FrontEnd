import { fetchPopularUpcomingMoviesandSeries } from "@api/tmdb/QueryFunctions";
import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { Image } from "@components/Image";
import { backdropPrefixSmall, posterPrefixSmall } from "@lib/const";
import { placeholderImage } from "@lib/placeholders";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

export const SELECTABLE_DATES = ["week", "month", "year"];

export function Sidebar({ contentType, queryType }) {
  const [date, setDate] = useState("week");
  const isInViewRef = useRef();

  const isInView = useInView(isInViewRef, { once: true, amount: 0 });

  const { data: upcomingData } = useQuery({
    queryKey: ["upcomingMovies", "upcomingSeries", date],
    queryFn: () => fetchPopularUpcomingMoviesandSeries(date),
  });
  const contentQuery =
    contentType === "movie"
      ? upcomingData?.upcomingMovies
      : upcomingData?.upcomingSeries;

  const upcomingList = (
    queryType ? contentQuery?.[queryType]?.results : contentQuery?.results
  )?.slice(0, 10);

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
                className={`${
                  date === selectableDate && "bg-cyan-500"
                } rounded px-2 py-1 text-sm capitalize`}
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
            upcomingList.map((content, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;

              const contentImage = content?.poster_path
                ? posterPrefixSmall + content.poster_path
                : content?.backdrop_path
                  ? backdropPrefixSmall + content.backdrop_path
                  : placeholderImage;

              const style = isFirst
                ? "text-red-500"
                : isSecond
                  ? "text-blue-400"
                  : isThird
                    ? "text-yellow-500"
                    : "";

              return (
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
                  <div className="flex w-12 items-center justify-center px-8 text-center">
                    <p
                      className={`${style} text-center font-londrina text-5xl`}
                    >
                      {index + 1}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-start gap-2 overflow-hidden">
                    <Image
                      isInView={isInView}
                      src={contentImage}
                      alt={`${content.title || content?.name} poster`}
                      width={185}
                      height={278}
                      className={"aspect-[2/3] w-1/5 object-cover"}
                      placeholderClassName={"aspect-[2/3] w-1/5 object-cover"}
                    />
                    <div className="flex w-[78%] flex-col p-2">
                      <Link
                        aria-label={`Link to ${content.title || content.name}`}
                        to={`/${contentType}/$${contentType}Id`}
                        params={{ [`${contentType}Id`]: content.id }}
                        className="w-full truncate font-sans text-lg group-hover:text-cyan-500"
                      >
                        {content.title || content.name}
                      </Link>
                      <div className="flex flex-row gap-1 text-xs">
                        <AddBookmarkButton
                          className={"w-[0.7rem]"}
                          contentId={content?.id}
                          mediaType={
                            content.mediaType ? content.mediaType : contentType
                          }
                        />
                        <p>{content.release_date || content.first_air_date}</p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          {!!upcomingList && !upcomingList?.length && (
            <div className="col-span-1 flex h-[122px] w-full items-center justify-center rounded-xl border-r-2 border-cyan-500 bg-[#131E2E] px-2 py-6 text-center">
              <p className="font-londrina text-4xl">
                No releases for the selected period.
              </p>
            </div>
          )}
        </ul>
      </AnimatePresence>
    </aside>
  );
}

Sidebar.propTypes = {
  contentType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  queryType: PropTypes.oneOf(["movies", "tv"]),
};
