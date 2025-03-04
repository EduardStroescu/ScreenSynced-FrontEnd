import {
  fetchPopularMovies,
  fetchRecommendedMovies,
  fetchPopularSeries,
  fetchPopularUpcomingMovies,
  fetchPopularUpcomingSeries,
  fetchRecommendedSeries,
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchSerieDetails,
  fetchSimilarSeries,
  searchContent,
} from "@api/tmdb/queryFunctions";

export const getIndexQueryConfig = () => {
  return {
    popularMovies: {
      queryKey: ["popularMovies", 1],
      queryFn: () => fetchPopularMovies(1),
    },
    recommendedMovies: {
      queryKey: ["recommendedMovies"],
      queryFn: fetchRecommendedMovies,
    },
    upcomingMovies: {
      queryKey: ["upcomingMovies"],
      queryFn: fetchPopularUpcomingMovies,
    },
    popularSeries: {
      queryKey: ["popularSeries", 1],
      queryFn: () => fetchPopularSeries(1),
    },
    recommendedSeries: {
      queryKey: ["recommendedSeries"],
      queryFn: fetchRecommendedSeries,
    },
    upcomingSeries: {
      queryKey: ["upcomingSeries"],
      queryFn: fetchPopularUpcomingSeries,
    },
  };
};

export const getMoviesPageQueryConfig = (pageNumber) => {
  return {
    popularMovies: {
      queryKey: ["popularMovies", pageNumber],
      queryFn: () => fetchPopularMovies(pageNumber),
      keepPreviousData: true,
    },
    upcomingMovies: {
      queryKey: ["upcomingMovies"],
      queryFn: fetchPopularUpcomingMovies,
      keepPreviousData: true,
    },
  };
};

export const getSeriesPageQueryConfig = (pageNumber) => {
  return {
    popularSeries: {
      queryKey: ["popularSeries", pageNumber],
      queryFn: () => fetchPopularSeries(pageNumber),
      keepPreviousData: true,
    },
    upcomingSeries: {
      queryKey: ["upcomingSeries"],
      queryFn: fetchPopularUpcomingSeries,
      keepPreviousData: true,
    },
  };
};

export const getMovieIdQueryConfig = (movieId) => {
  return {
    movieDetails: {
      queryKey: ["movie", movieId],
      queryFn: () => fetchMovieDetails(movieId),
    },
    similarMovies: {
      queryKey: ["similarMovies", movieId],
      queryFn: () => fetchSimilarMovies(movieId),
    },
  };
};

export const getSerieIdQueryConfig = (serieId) => {
  return {
    serieDetails: {
      queryKey: ["serie", serieId],
      queryFn: () => fetchSerieDetails(serieId),
    },
    similarSeries: {
      queryKey: ["similarSeries", serieId],
      queryFn: () => fetchSimilarSeries(serieId),
    },
  };
};

export const getSearchPageQueryConfig = (searchTerm, pageNumber) => {
  return {
    queryKey: ["search", searchTerm, pageNumber],
    queryFn: () => searchContent(searchTerm, pageNumber),
    keepPreviousData: true,
  };
};

export const getBookmarksQueryConfig = (bookmarksByType) => {
  return {
    movies: {
      queries: bookmarksByType.movie?.map((id) => {
        return {
          queryKey: ["movie", id],
          queryFn: () => fetchMovieDetails(id),
          enabled: !!id,
        };
      }),
    },
    series: {
      queries: bookmarksByType.tv?.map((id) => {
        return {
          queryKey: ["serie", id],
          queryFn: () => fetchSerieDetails(id),
          enabled: !!id,
        };
      }),
    },
  };
};
