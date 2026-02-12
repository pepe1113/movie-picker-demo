import { useQuery } from '@tanstack/react-query'
import {
  getMovieDetail,
  getMovieCredits,
  getMovieVideos,
} from '@/services/tmdb/api'
import { QUERY_KEYS } from '@/utils/constants'

export function useMovieDetail(movieId: number) {
  const detailQuery = useQuery({
    queryKey: QUERY_KEYS.movies.detail(movieId),
    queryFn: () => getMovieDetail(movieId),
    enabled: movieId > 0,
  })

  const creditsQuery = useQuery({
    queryKey: QUERY_KEYS.movies.credits(movieId),
    queryFn: () => getMovieCredits(movieId),
    enabled: movieId > 0,
  })

  const videosQuery = useQuery({
    queryKey: QUERY_KEYS.movies.videos(movieId),
    queryFn: () => getMovieVideos(movieId),
    enabled: movieId > 0,
  })

  return {
    detail: detailQuery.data,
    credits: creditsQuery.data,
    videos: videosQuery.data,
    isLoading:
      detailQuery.isLoading || creditsQuery.isLoading || videosQuery.isLoading,
    isError: detailQuery.isError || creditsQuery.isError || videosQuery.isError,
    error: detailQuery.error ?? creditsQuery.error ?? videosQuery.error,
  }
}
