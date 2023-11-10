import { contentGenres } from "../api/tmdb/movieEndpoints";

export function getYoutubeLink(videoIds) {
  if (videoIds !== null && videoIds !== undefined) {
    const youtubeLink = "https://www.youtube.com/watch?v=" + videoIds;
    return youtubeLink;
  }
  return null;
}

export function getYoutubeLinks(videoIds) {
  if (videoIds !== null && videoIds !== undefined) {
    const youtubeLink = videoIds.map(
      (id) => "https://www.youtube.com/watch?v=" + id,
    );
    return youtubeLink;
  }
  return null;
}

export const findGenreIdByName = (contentType, genreName) => {
  const genreList = contentGenres[contentType];
  const genre = genreList.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase(),
  );
  return genre ? genre.id : null;
};
