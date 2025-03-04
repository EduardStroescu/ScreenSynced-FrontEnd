import { bookmarkApi } from "@api/backend/modules/bookmark.api";
import {
  fetchCarouselMovieVideos,
  fetchCarouselSeriesVideos,
  fetchSeasons,
  fetchContentByGenre,
} from "@api/tmdb/queryFunctions";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useBookmarksQuery = (user) => {
  return useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: bookmarkApi.getList,
    enabled: !!user?.id,
  });
};

export function useContentVideos(contentIds, queryType) {
  const queryConfig = {
    movies: {
      queries: contentIds?.map((id) => ({
        queryKey: ["movieVideos", id],
        queryFn: () => fetchCarouselMovieVideos(id),
      })),
    },
    series: {
      queries: contentIds?.map((id) => ({
        queryKey: ["serieVideos", id],
        queryFn: () => fetchCarouselSeriesVideos(id),
      })),
    },
  };

  const apiData = useQueries(queryConfig[queryType]);

  if (!apiData.length) return [];

  return apiData;
}

export const useDiscoverQuery = (contentType, genres, pageNumber) => {
  return useQuery({
    queryKey: ["DiscoverByGenre", contentType, genres, pageNumber],
    queryFn: () => fetchContentByGenre(contentType, genres, pageNumber),
    enabled: !!contentType && !!genres && !!pageNumber,
    keepPreviousData: true,
  });
};

export function useSeasonsQuery(serieId, seasonNumber) {
  return useQuery({
    queryKey: ["seasons", serieId, seasonNumber],
    queryFn: () => fetchSeasons(serieId, seasonNumber),
    enabled: !!serieId && !!seasonNumber,
  });
}
