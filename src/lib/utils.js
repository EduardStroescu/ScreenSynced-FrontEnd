import { contentGenres } from "@api/tmdb/movieEndpoints";
import { imagePrefixes, placeholderImage } from "./const";

export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.type = "CustomError";
  }
}

export function getYoutubeLink(videoId) {
  if (videoId !== null && videoId !== undefined) {
    const youtubeLink = "https://www.youtube.com/watch?v=" + videoId;
    return youtubeLink;
  }
  return null;
}

export function getContentImageUrl(content, posterSize, backdropSize) {
  if (content.poster_path != null) {
    return imagePrefixes.poster[posterSize] + content.poster_path;
  }
  if (content.backdrop_path != null) {
    return imagePrefixes.backdrop[backdropSize] + content.backdrop_path;
  }
  return placeholderImage;
}

export function getCastImageUrl(director) {
  if (director.profile_path != null) {
    return imagePrefixes.poster.small + director.profile_path;
  }
  return placeholderImage;
}

export function getYoutubeLinks(videoIds) {
  if (videoIds !== null && videoIds !== undefined && videoIds.length > 0) {
    const youtubeLinks = videoIds.map((id) =>
      id ? "https://www.youtube.com/watch?v=" + id : undefined,
    );
    return youtubeLinks;
  }
  return [];
}

export const findGenreIdByName = (contentType, genreName) => {
  if (genreName === null || genreName === undefined || genreName === "") return;

  const genreList = contentGenres[contentType];
  if (!genreList) return;

  const genre = genreList.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase(),
  );

  return genre?.id ?? null;
};
