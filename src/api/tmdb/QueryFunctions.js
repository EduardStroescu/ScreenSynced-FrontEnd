import axios from "axios";

import { findGenreIdByName } from "../../lib/utils";
import { Sections } from "./movieEndpoints";

export const baseUrl = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchAllContent = async () => {
  const [moviesResponse, seriesResponse] = await Promise.all([
    baseUrl.get(Sections.movies.sections[0].endpoint),
    baseUrl.get(Sections.series.sections[0].endpoint),
  ]);
  return {
    movies: moviesResponse.data,
    tv: seriesResponse.data,
  };
};

export const fetchPopularUpcomingMoviesandSeries = async (date) => {
  const [upcomingMoviesResponse, upcomingSeriesResponse] = await Promise.all([
    baseUrl.get(Sections.movies.helpers.popularUpcomingMovies[date]),
    baseUrl.get(Sections.series.helpers.popularUpcomingSeries[date]),
  ]);
  return {
    upcomingMovies: upcomingMoviesResponse.data,
    upcomingSeries: upcomingSeriesResponse.data,
  };
};

export const fetchMovies = async (pageNumber) => {
  return await baseUrl.get(
    Sections.movies.sections[0].endpoint.replace("page_number", pageNumber),
  );
};

export const fetchMovieDetails = async (contentId) => {
  const response = await baseUrl.get(
    Sections.movies.helpers.fetchMovieDetails.replace("movie_id", contentId),
  );
  return response.data;
};

export const fetchMovieDetailsAndCredits = async (contentId) => {
  const [contentDetails, credits, similarMovies] = await Promise.all([
    baseUrl.get(
      Sections.movies.helpers.fetchMovieDetails.replace("movie_id", contentId),
    ),
    baseUrl.get(
      Sections.movies.helpers.fetchMovieCredits.replace("movie_id", contentId),
    ),
    baseUrl.get(
      Sections.movies.helpers.fetchSimilarMovies.replace("movie_id", contentId),
    ),
  ]);
  return {
    contentDetails: contentDetails.data,
    credits: credits.data,
    similarMovies: similarMovies.data,
  };
};

export const fetchCarouselMovieVideos = async (contentId) => {
  const response = await baseUrl.get(
    Sections.movies.helpers.fetchMovieVideos?.replace("movie_id", contentId),
  );
  return response.data;
};

export const fetchSeries = async (pageNumber) => {
  return await baseUrl.get(
    Sections.series.sections[0].endpoint.replace("page_number", pageNumber),
  );
};

export const fetchSerieDetails = async (contentId) => {
  const response = await baseUrl.get(
    Sections.series.helpers.fetchSerieDetails.replace("series_id", contentId),
  );
  return response.data;
};

export const fetchSerieDetailsAndCredits = async (contentId) => {
  const [contentDetails, credits, similarSeries] = await Promise.all([
    baseUrl.get(
      Sections.series.helpers.fetchSerieDetails.replace("series_id", contentId),
    ),
    baseUrl.get(
      Sections.series.helpers.fetchSeriesCredits.replace(
        "series_id",
        contentId,
      ),
    ),
    baseUrl.get(
      Sections.series.helpers.fetchSimilarSeries.replace(
        "series_id",
        contentId,
      ),
    ),
  ]);
  return {
    contentDetails: contentDetails.data,
    credits: credits.data,
    similarSeries: similarSeries.data,
  };
};

export const fetchCarouselSeriesVideos = async (contentId) => {
  const response = await baseUrl.get(
    Sections.series.helpers.fetchTVVideos?.replace("series_id", contentId),
  );
  return response.data;
};

export const searchContent = async (searchTerm, pageNumber) => {
  return await baseUrl.get(
    Sections.search
      .replace("search_term", searchTerm)
      .replace("page_number", pageNumber),
  );
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
  return await baseUrl.get(
    Sections[contentType].sections
      .find((section) => section.title === "DiscoverByGenre")
      .endpoint.replace("genre_tags", validGenreIds)
      .replace("page_number", pageNumber),
  );
};
