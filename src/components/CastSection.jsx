import { getCastImageUrl } from "@lib/utils";
import PropTypes from "prop-types";

const MAX_CAST_SIZE = 10;

export function CastSection({ cast }) {
  const filteredActors = cast?.filter(
    (actor) => actor.known_for_department === "Acting",
  );

  if (!cast || !cast.length) return;

  return (
    <article className="col-span-6 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
        {filteredActors?.slice(0, MAX_CAST_SIZE).map((actor, index) => {
          return (
            <div
              key={actor?.id ?? index}
              className="flex flex-row items-center gap-4 pl-1"
            >
              <img
                src={getCastImageUrl(actor)}
                alt={`Picture of ${actor?.name}`}
                className="aspect-[1/1] w-[3rem] rounded-full object-cover"
              />
              <p>
                {actor?.name} <span className="text-cyan-500">as</span>{" "}
                {actor?.character}
              </p>
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
