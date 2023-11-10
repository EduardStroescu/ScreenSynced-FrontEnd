const API_KEY = import.meta.env.VITE_TMDB_KEY;
const date = new Date();

const currentDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function addWeekToCurrentDate(date) {
  date.setDate(date.getDate() + 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getLastDayofMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Create a new date object for the next month's first day
  const nextMonth = new Date(year, month + 1, 1);

  // Subtract one day from the next month's first day to get the last day of the current month
  const lastDay = new Date(nextMonth - 1);

  const formattedYear = lastDay.getFullYear();
  const formattedMonth = String(lastDay.getMonth() + 1).padStart(2, "0");
  const formattedDay = String(lastDay.getDate()).padStart(2, "0");

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

export const contentGenres = {
  movies: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
  series: [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

export const Sections = {
  movies: {
    sections: [
      {
        title: "Popular Movies",
        endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=false&language=en-US&page=page_number&sort_by=popularity.desc&with_original_language=en`,
      },
      {
        title: "DiscoverByGenre",
        endpoint: `/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=page_number&sort_by=popularity.desc&with_genres=genre_tags`,
      },
    ],
    helpers: {
      popularUpcomingMovies: {
        week: `/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=true&language=en-US&page=1&primary_release_date.gte=${currentDate(
          date,
        )}&primary_release_date.lte=${addWeekToCurrentDate(
          date,
        )}&sort_by=popularity.desc`,
        month: `/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=true&language=en-US&page=1&primary_release_date.gte=${currentDate(
          date,
        )}&primary_release_date.lte=${getLastDayofMonth(
          date,
        )}&sort_by=popularity.desc`,
        year: `/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=true&language=en-US&page=1&primary_release_date.gte=${currentDate(
          date,
        )}&primary_release_date.lte=${date.getFullYear()}-12-31&sort_by=popularity.desc`,
      },
      searchMovie: `/search/movie?api_key=${API_KEY}&query={{query}}`,
      fetchMovieGenres: `genre/movie/list?api_key=${API_KEY}`,
      fetchMovieVideos: `/movie/movie_id/videos?api_key=${API_KEY}`,
      fetchMovieDetails: `/movie/movie_id?api_key=${API_KEY}&append_to_response=videos`,
      fetchSimilarMovies: `/movie/movie_id/similar?api_key=${API_KEY}&language=en-US&page=1`,
      fetchMovieCredits: `/movie/movie_id/credits?api_key=${API_KEY}`,
    },
  },
  series: {
    sections: [
      {
        title: "Popular Series",
        endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=page_number&sort_by=popularity.desc&with_original_language=en&without_genres=10763%2C%2010764%2C%2010766%2C%2010767`,
      },
      {
        title: "DiscoverByGenre",
        endpoint: `/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=genre_tags`,
      },
    ],
    helpers: {
      popularUpcomingSeries: {
        week: `/discover/tv?api_key=${API_KEY}&air_date.gte=${currentDate(
          date,
        )}&air_date.lte=${addWeekToCurrentDate(
          date,
        )}&first_air_date.gte=${currentDate(
          date,
        )}&first_air_date.lte=${addWeekToCurrentDate(
          date,
        )}&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&with_original_language=en&without_genres=10763%2C%2010764%2C%2010766%2C%2010767&sort_by=popularity.desc`,
        month: `/discover/tv?api_key=${API_KEY}&air_date.gte=${currentDate(
          date,
        )}&air_date.lte=${getLastDayofMonth(
          date,
        )}&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&without_genres=10763%2C%2010764%2C%2010766%2C%2010767&sort_by=popularity.desc`,
        year: `/discover/tv?api_key=${API_KEY}&air_date.gte=${currentDate(
          date,
        )}&air_date.lte=${date.getFullYear()}-12-31&first_air_date.gte=${currentDate(
          date,
        )}&first_air_date.lte=${date.getFullYear()}-12-31&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&without_genres=10763%2C%2010764%2C%2010766%2C%2010767&sort_by=popularity.desc`,
      },
      fetchSeriesGenres: `genre/tv/list?api_key=${API_KEY}`,
      fetchSeriesVideos: `/tv/series_id/videos?api_key=${API_KEY}`,
      fetchSerieDetails: `/tv/series_id?api_key=${API_KEY}&append_to_response=videos`,
      fetchSeriesCredits: `/tv/series_id/credits?api_key=${API_KEY}&language=en-US`,
      fetchSimilarSeries: `/tv/series_id/similar?api_key=${API_KEY}&language=en-US&page=1`,
    },
  },
  search: `search/multi?api_key=${API_KEY}&query=search_term&include_adult=false&language=en-US&page=page_number`,
};
