import PropTypes from "prop-types";

export const contentItemPropTypes = PropTypes.shape({
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number,
  mediaType: PropTypes.oneOf(["tv", "movie"]),
  original_language: PropTypes.string,
  original_title: PropTypes.string, // For movies
  original_name: PropTypes.string, // For TV shows
  overview: PropTypes.string,
  popularity: PropTypes.number,
  poster_path: PropTypes.string,
  release_date: PropTypes.string, // For movies
  first_air_date: PropTypes.string, // For TV shows
  title: PropTypes.string, // For movies
  name: PropTypes.string, // For TV shows
  origin_country: PropTypes.arrayOf(PropTypes.string), // For TV shows
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
});
