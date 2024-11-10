import { contentGenres } from "@api/tmdb/movieEndpoints";

export function getYoutubeLink(videoId) {
  if (videoId !== null && videoId !== undefined) {
    const youtubeLink = "https://www.youtube.com/watch?v=" + videoId;
    return youtubeLink;
  }
  return null;
}

export function getYoutubeLinks(videoIds) {
  if (videoIds !== null && videoIds !== undefined && videoIds.length > 0) {
    const youtubeLink = videoIds.map(
      (id) => "https://www.youtube.com/watch?v=" + id,
    );
    return youtubeLink;
  }
  return null;
}

export const findGenreIdByName = (contentType, genreName) => {
  if (genreName === null || genreName === undefined || genreName === "")
    return null;
  const genreList = contentGenres[contentType];
  if (!genreList) return null;
  const genre = genreList.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase(),
  );
  return genre ? genre.id : null;
};
