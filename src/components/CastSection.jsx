import PropTypes from "prop-types";
import { placeholderImage } from "../lib/placeholders";

export function CastSection({ cast }) {
  const filteredActors = cast?.filter(
    (actor) => actor.known_for_department === "Acting",
  );

  if (!cast || !filteredActors.length) return;

  return (
    <section className="col-span-6 rounded-xl border-4 border-[#131E2E] p-4">
      <h2 className="text-3xl text-cyan-500">Cast</h2>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
        {filteredActors?.slice(0, 10).map((cast) => {
          const castImage =
            cast.profile_path !== null && cast.profile_path !== undefined
              ? "https://image.tmdb.org/t/p/w185" + cast.profile_path
              : placeholderImage;
          return (
            <div
              key={cast.id}
              className="flex flex-row items-center gap-4 pl-1"
            >
              <img
                src={castImage}
                alt=""
                className="aspect-[1/1] w-[3rem] rounded-full object-cover"
              />
              <p>
                {cast.name} <span className="text-cyan-500">as</span>{" "}
                {cast.character}
              </p>
            </div>
          );
        })}
      </div>
    </section>
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
