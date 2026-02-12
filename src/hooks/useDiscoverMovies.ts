import { useInfiniteQuery } from '@tanstack/react-query'
import { discoverMovies } from '@/services/tmdb/api'
import { useFilterStore } from '@/stores/filterStore'
import { QUERY_KEYS } from '@/utils/constants'
import type { DiscoverMovieParams } from '@/services/tmdb/types'

interface UseDiscoverMoviesOptions {
  enabled?: boolean
}

export function useDiscoverMovies(options: UseDiscoverMoviesOptions = {}) {
  const { enabled = true } = options
  const { genres, year, rating, sortBy } = useFilterStore()

  // Build discover params from filter state
  const params: DiscoverMovieParams = {
    sort_by: sortBy,
  }

  if (genres.length > 0) {
    params.with_genres = genres.join(',')
  }

  if (year.from) {
    params['primary_release_date.gte'] = `${year.from}-01-01`
  }

  if (year.to) {
    params['primary_release_date.lte'] = `${year.to}-12-31`
  }

  if (rating.min > 0) {
    params['vote_average.gte'] = rating.min
  }

  if (rating.max < 10) {
    params['vote_average.lte'] = rating.max
  }

  // Add minimum vote count to ensure quality results
  params['vote_count.gte'] = 100

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.movies.discover(params as Record<string, unknown>),
    queryFn: ({ pageParam }) =>
      discoverMovies({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      movies: data.pages.flatMap((page) => page.results),
      totalResults: data.pages[0]?.total_results ?? 0,
    }),
    enabled,
  })
}
