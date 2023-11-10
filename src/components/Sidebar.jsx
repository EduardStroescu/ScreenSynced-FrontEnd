import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fetchPopularUpcomingMoviesandSeries } from "../api/tmdb/QueryFunctions";
import { AddBookmarkButton, Image } from "./";

export function Sidebar({ contentType, queryType }) {
  const isInViewRef = useRef();
  const [date, setDate] = useState("week");

  const isInView = useInView(isInViewRef, { once: true, amount: 0 });

  const { data: upcomingData } = useQuery({
    queryKey: ["upcomingMovies", "upcomingSeries", date],
    queryFn: () => fetchPopularUpcomingMoviesandSeries(date),
  });
  const contentQuery =
    contentType === "movie"
      ? upcomingData?.upcomingMovies
      : upcomingData?.upcomingSeries;

  return (
    <aside className="col-span-1 hidden overflow-hidden p-1 lg:p-6 xl:block">
      <header className="flex flex-col items-center justify-between gap-4 pb-[1.46rem] pt-1 lg:flex-row lg:gap-0">
        <h2 className="text-2xl text-cyan-500">
          Upcoming {contentType === "movie" ? "Movies" : "Series"}
        </h2>
        <div className="flex gap-1 lg:flex-row">
          <button
            onClick={() => setDate("week")}
            className={`${
              date === "week" && "bg-cyan-500"
            } rounded px-2 py-1 text-sm`}
          >
            Week
          </button>
          <button
            onClick={() => setDate("month")}
            className={`${
              date === "month" && "bg-cyan-500"
            } rounded px-2 py-1 text-sm`}
          >
            Month
          </button>
          <button
            onClick={() => setDate("year")}
            className={`${
              date === "year" && "bg-cyan-500"
            } rounded px-2 py-1 text-sm`}
          >
            Year
          </button>
        </div>
      </header>
      <AnimatePresence>
        <article ref={isInViewRef} className="grid grid-cols-1 gap-2">
          {(queryType
            ? contentQuery[queryType]?.results
            : contentQuery?.results
          )
            ?.slice(0, 10)
            .map((content, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;

              const contentImage =
                content.poster_path !== null &&
                content.poster_path !== undefined
                  ? "https://image.tmdb.org/t/p/w185" + content.poster_path
                  : content.backdrop_path !== null &&
                    content.backdrop_path !== undefined
                  ? "https://image.tmdb.org/t/p/w300" + content.backdrop_path
                  : "https://placehold.co/400x400/070B11/06b6d4?text=A+picture+is+worth\\na+thousand+words,\\nbut+not+today.&font=sans";

              const style = [
                isFirst && "text-red-500",
                isSecond && "text-blue-400",
                isThird && "text-yellow-500",
              ].join(" ");

              return (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.25,
                    delay: index / 6,
                  }}
                  key={content.id}
                  className="col-span-1 flex w-full items-center justify-start rounded-xl border-r-2 border-cyan-500 bg-[#131E2E]"
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
                      alt={content?.name}
                      width={185}
                      height={278}
                      className={"aspect-[2/3] w-1/5 object-cover"}
                      placeholderClassName={"aspect-[2/3] w-1/5 object-cover"}
                    />
                    <div className="flex w-[80%] flex-col p-2">
                      <Link
                        to={`/${contentType}/$${contentType}Id`}
                        params={{ [`${contentType}Id`]: content.id }}
                        className="w-full truncate font-sans text-lg hover:text-cyan-500"
                      >
                        {content.title || content.name}
                      </Link>
                      <div className="flex flex-row gap-1 text-xs">
                        <AddBookmarkButton
                          className={"w-[0.7rem]"}
                          contentId={content.id}
                          mediaType={
                            content.mediaType ? content.mediaType : contentType
                          }
                        />
                        <p>{content.release_date || content.first_air_date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </article>
      </AnimatePresence>
    </aside>
  );
}
