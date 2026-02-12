import { useInfiniteQuery } from '@tanstack/react-query'
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '@/services/tmdb/api'
import { QUERY_KEYS } from '@/utils/constants'
import type { MovieListResponse } from '@/services/tmdb/types'

type MovieListType = 'trending' | 'popular' | 'top_rated' | 'now_playing'

const fetcherMap: Record<
  MovieListType,
  (page: number) => Promise<MovieListResponse>
> = {
  trending: getTrendingMovies,
  popular: getPopularMovies,
  top_rated: getTopRatedMovies,
  now_playing: getNowPlayingMovies,
}

const queryKeyMap: Record<MovieListType, () => readonly string[]> = {
  trending: QUERY_KEYS.movies.trending,
  popular: QUERY_KEYS.movies.popular,
  top_rated: QUERY_KEYS.movies.topRated,
  now_playing: QUERY_KEYS.movies.nowPlaying,
}

export function useMovies(type: MovieListType) {
  return useInfiniteQuery({
    queryKey: queryKeyMap[type](),
    queryFn: ({ pageParam }) => fetcherMap[type](pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      movies: data.pages.flatMap((page) => page.results),
      totalResults: data.pages[0]?.total_results ?? 0,
    }),
  })
}
