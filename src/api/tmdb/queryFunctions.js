import axios from "axios";

import { findGenreIdByName } from "../../lib/utils";
import { Sections } from "./movieEndpoints";

export const baseUrl = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchPopularMovies = async (pageNumber) => {
  const { data } = await baseUrl.get(
    Sections.movies.popularMovies.replace("page_number", pageNumber),
  );

  return data;
};

export const fetchRecommendedMovies = async () => {
  const { data } = await baseUrl.get(Sections.movies.recommendedMovies);

  return data;
};

export const fetchPopularUpcomingMovies = async () => {
  const [{ data: week }, { data: month }, { data: year }] = await Promise.all([
    baseUrl.get(Sections.movies.popularUpcomingMovies.week),
    baseUrl.get(Sections.movies.popularUpcomingMovies.month),
    baseUrl.get(Sections.movies.popularUpcomingMovies.year),
  ]);

  return {
    week,
    month,
    year,
  };
};

export const fetchMovieDetails = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.movies.fetchMovieDetails.replace("movie_id", contentId),
  );

  return data;
};

export const fetchSimilarMovies = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.movies.fetchSimilarMovies.replace("movie_id", contentId),
  );

  return data;
};

export const fetchCarouselMovieVideos = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.movies.fetchMovieVideos.replace("movie_id", contentId),
  );
  return data;
};

export const fetchPopularSeries = async (pageNumber) => {
  const { data } = await baseUrl.get(
    Sections.series.popularSeries.replace("page_number", pageNumber),
  );

  return data;
};

export const fetchRecommendedSeries = async () => {
  const { data } = await baseUrl.get(Sections.series.recommendedSeries);

  return data;
};

export const fetchPopularUpcomingSeries = async () => {
  const [{ data: week }, { data: month }, { data: year }] = await Promise.all([
    baseUrl.get(Sections.series.popularUpcomingSeries.week),
    baseUrl.get(Sections.series.popularUpcomingSeries.month),
    baseUrl.get(Sections.series.popularUpcomingSeries.year),
  ]);

  return {
    week,
    month,
    year,
  };
};

export const fetchSerieDetails = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.series.fetchSerieDetails.replace("series_id", contentId),
  );

  return data;
};

export const fetchSimilarSeries = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.series.fetchSimilarSeries.replace("series_id", contentId),
  );

  return data;
};

export const fetchSeasons = async (contentId, seasonNumber) => {
  const { data } = await baseUrl.get(
    Sections.series.fetchSeasons
      .replace("series_id", contentId)
      .replace("season_number", seasonNumber),
  );

  return data;
};

export const fetchCarouselSeriesVideos = async (contentId) => {
  const { data } = await baseUrl.get(
    Sections.series.fetchSeriesVideos.replace("series_id", contentId),
  );

  return data;
};

export const searchContent = async (searchTerm, pageNumber) => {
  const { data } = await baseUrl.get(
    Sections.search
      .replace("search_term", searchTerm)
      .replace("page_number", pageNumber),
  );

  return data;
};

export const fetchContentByGenre = async (
  contentType,
  genresNames,
  pageNumber,
) => {
  const genreIds = genresNames.map((genreName) =>
    findGenreIdByName(contentType, genreName),
  );
  const validGenreIds = genreIds.filter((id) => id !== null).join(",");
  if (validGenreIds === "") {
    return null;
  }

  const { data } = await baseUrl.get(
    Sections[contentType].discoverByGenre
      .replace("genre_tags", validGenreIds)
      .replace("page_number", pageNumber),
  );

  return data;
};
