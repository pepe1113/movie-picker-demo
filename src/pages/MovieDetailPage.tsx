import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Star, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { WishlistButton } from '@/components/features/wishlist/WishlistButton'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import {
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  formatRating,
  formatYear,
  formatRuntime,
} from '@/utils/helpers'
import { ROUTES } from '@/utils/constants'
import type { Movie } from '@/services/tmdb/types'

export function Component() {
  const { id } = useParams()
  const movieId = Number(id)
  const { detail, credits, videos, isLoading, isError } =
    useMovieDetail(movieId)

  if (isError) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-20">
        <h1 className="text-2xl font-bold">找不到這部電影</h1>
        <Button asChild>
          <Link to={ROUTES.HOME}>回到首頁</Link>
        </Button>
      </div>
    )
  }

  if (isLoading || !detail) {
    return <DetailSkeleton />
  }

  const trailer = videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube',
  )
  const cast = credits?.cast.slice(0, 12) ?? []

  // 轉換為 Movie 型別供 WishlistButton 使用
  const movieForWishlist: Movie = {
    adult: detail.adult,
    backdrop_path: detail.backdrop_path,
    genre_ids: detail.genres.map((g) => g.id),
    id: detail.id,
    original_language: detail.original_language,
    original_title: detail.original_title,
    overview: detail.overview,
    popularity: detail.popularity,
    poster_path: detail.poster_path,
    release_date: detail.release_date,
    title: detail.title,
    video: detail.video,
    vote_average: detail.vote_average,
    vote_count: detail.vote_count,
  }

  return (
    <div className="pb-12">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getBackdropUrl(detail.backdrop_path)})`,
          }}
        >
          <div className="from-background via-background/60 to-background/30 absolute inset-0 bg-gradient-to-t" />
        </div>

        <div className="relative container mx-auto px-4 pt-8">
          {/* 返回按鈕 */}
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link to={ROUTES.HOME}>
              <ArrowLeft className="size-4" />
              返回
            </Link>
          </Button>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* 海報 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="shrink-0"
            >
              <img
                src={getPosterUrl(detail.poster_path, 'large')}
                alt={detail.title}
                className="w-48 rounded-lg shadow-2xl md:w-64"
              />
            </motion.div>

            {/* 資訊 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold md:text-4xl">{detail.title}</h1>

              {detail.tagline && (
                <p className="text-muted-foreground italic">{detail.tagline}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  {formatRating(detail.vote_average)}
                  <span className="text-muted-foreground">
                    ({detail.vote_count.toLocaleString()})
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {formatYear(detail.release_date)}
                </span>
                {detail.runtime > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {formatRuntime(detail.runtime)}
                  </span>
                )}
              </div>

              {/* 類型 */}
              <div className="flex flex-wrap gap-2">
                {detail.genres.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* 操作按鈕 */}
              <div className="flex gap-3">
                <WishlistButton movie={movieForWishlist} size="lg" />
                {trailer && (
                  <Button variant="outline" asChild>
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="size-4" />
                      觀看預告片
                    </a>
                  </Button>
                )}
              </div>

              {/* 概述 */}
              {detail.overview && (
                <div className="space-y-2">
                  <h3 className="font-semibold">劇情簡介</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {detail.overview}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto space-y-10 px-4 pt-10">
        {/* 演員 */}
        {cast.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">演員陣容</h2>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mx-auto mb-2 size-20 overflow-hidden rounded-full">
                    <img
                      src={getProfileUrl(member.profile_path)}
                      alt={member.name}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <p className="truncate text-xs font-medium">{member.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {member.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 預告片 */}
        {trailer && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">預告片</h2>
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </section>
        )}

        {/* 電影資訊 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">電影資訊</h2>
          <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <p className="text-foreground font-medium">原始片名</p>
              <p>{detail.original_title}</p>
            </div>
            <div>
              <p className="text-foreground font-medium">狀態</p>
              <p>{detail.status}</p>
            </div>
            {detail.budget > 0 && (
              <div>
                <p className="text-foreground font-medium">預算</p>
                <p>${detail.budget.toLocaleString()}</p>
              </div>
            )}
            {detail.revenue > 0 && (
              <div>
                <p className="text-foreground font-medium">票房</p>
                <p>${detail.revenue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <Skeleton className="h-72 w-48 shrink-0 rounded-lg md:h-96 md:w-64" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  )
}
