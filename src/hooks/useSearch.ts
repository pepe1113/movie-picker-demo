import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMovies } from '@/services/tmdb/api'
import { QUERY_KEYS } from '@/utils/constants'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query.trim(), 500)

  const result = useInfiniteQuery({
    queryKey: QUERY_KEYS.movies.search(debouncedQuery),
    queryFn: ({ pageParam }) => searchMovies(debouncedQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: debouncedQuery.length > 0,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      movies: data.pages.flatMap((page) => page.results),
      totalResults: data.pages[0]?.total_results ?? 0,
    }),
  })

  return {
    ...result,
    debouncedQuery,
  }
}
