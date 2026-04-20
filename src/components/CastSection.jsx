import { getCastImageUrl } from "@lib/utils";
import PropTypes from "prop-types";
import { Image } from "./Image";

export const MAX_CAST_SIZE = 10;

export function CastSection({ cast }) {
  const filteredActors = cast?.filter(
    (actor) => actor.known_for_department === "Acting",
  );

  if (!filteredActors || !filteredActors.length) return;

  return (
    <article className="col-span-6 flex flex-col gap-4 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="ml-1 text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActors?.slice(0, MAX_CAST_SIZE).map((actor, index) => {
          return (
            <div
              key={actor?.id ?? index}
              className="flex flex-row items-center gap-4 pl-1"
            >
              <Image
                isInView
                width={64}
                height={64}
                src={getCastImageUrl(actor)}
                alt={`Picture of ${actor?.name || "N/A"}`}
                imageClassName="aspect-[1/1] w-16 rounded-full object-cover"
              />
              <div className="flex w-full flex-col">
                <span>{actor?.name || "N/A"}</span>
                <span className="text-slate-400">
                  {actor?.character || "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

CastSection.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      cast_id: PropTypes.number,
      character: PropTypes.string,
      credit_id: PropTypes.string,
      gender: PropTypes.number,
      id: PropTypes.number,
      known_for_department: PropTypes.string,
      name: PropTypes.string,
      order: PropTypes.number,
      profile_path: PropTypes.string,
    }),
  ).isRequired,
};
