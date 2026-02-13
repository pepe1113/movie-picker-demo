import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const { id } = useParams()
  const movieId = Number(id)
  const { detail, credits, videos, isLoading, isError } =
    useMovieDetail(movieId)

  if (isError) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight">
          {t('movieDetail.notFound')}
        </h1>
        <Button variant="outline" asChild>
          <Link to={ROUTES.HOME}>
            <ArrowLeft className="size-4" />
            {t('movieDetail.backToHome')}
          </Link>
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

  // Convert to Movie type for WishlistButton
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
    <div className="min-h-screen pb-20">
      {/* Hero Section - Bold Typography Style */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Backdrop - Subtle */}
        {detail.backdrop_path && (
          <div className="absolute inset-0 opacity-5">
            <img
              src={getBackdropUrl(detail.backdrop_path)}
              alt=""
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90" />
          </div>
        )}

        {/* Decorative rating number */}
        <div
          className="pointer-events-none absolute -right-10 top-0 select-none text-[16rem] font-bold leading-none tracking-tighter text-border opacity-20 md:text-[20rem] lg:text-[24rem]"
          aria-hidden="true"
        >
          {formatRating(detail.vote_average)}
        </div>

        <div className="container relative mx-auto px-6 py-12 md:px-12 lg:px-16">
          {/* Back Button */}
          <Button variant="ghost" size="sm" className="mb-8" asChild>
            <Link to={ROUTES.HOME}>
              <ArrowLeft className="size-4" />
              {t('movieDetail.backButton')}
            </Link>
          </Button>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Poster - Sharp edges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <img
                src={getPosterUrl(detail.poster_path, 'large')}
                alt={detail.title}
                className="w-full border border-border shadow-2xl md:w-64 lg:w-80"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex-1 space-y-8"
            >
              {/* Accent bar */}
              <div className="h-1 w-20 bg-accent" aria-hidden="true" />

              {/* Title - Huge */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-none tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                  {detail.title}
                </h1>

                {detail.tagline && (
                  <p className="text-xl italic text-accent md:text-2xl">
                    {detail.tagline}
                  </p>
                )}
              </div>

              {/* Meta - Monospace */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-sm uppercase tracking-wide text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-accent">
                    {formatRating(detail.vote_average)}
                  </span>
                  <span className="text-xs">
                    ({detail.vote_count.toLocaleString()})
                  </span>
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  {formatYear(detail.release_date)}
                </span>
                {detail.runtime > 0 && (
                  <>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-4" />
                      {formatRuntime(detail.runtime)}
                    </span>
                  </>
                )}
              </div>

              {/* Genres - Sharp badges */}
              <div className="flex flex-wrap gap-2">
                {detail.genres.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <WishlistButton movie={movieForWishlist} size="lg" />
                {trailer && (
                  <Button variant="ghost" size="lg" asChild>
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="size-5" />
                      {t('movieDetail.watchTrailer')}
                    </a>
                  </Button>
                )}
              </div>

              {/* Overview */}
              {detail.overview && (
                <div className="space-y-4 border-t border-border pt-8">
                  <div className="space-y-2">
                    <div className="h-0.5 w-12 bg-accent" aria-hidden="true" />
                    <h3 className="text-2xl font-bold tracking-tight">
                      {t('movieDetail.sections.overview')}
                    </h3>
                  </div>
                  <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    {detail.overview}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto space-y-20 px-6 py-20 md:px-12 lg:px-16">
        {/* Cast */}
        {cast.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="h-0.5 w-12 bg-accent" aria-hidden="true" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t('movieDetail.sections.cast')}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {cast.map((member) => (
                <div key={member.id} className="space-y-3 text-center">
                  {/* Square profile image - no rounded corners */}
                  <div className="mx-auto aspect-square w-full overflow-hidden border border-border">
                    <img
                      src={getProfileUrl(member.profile_path)}
                      alt={member.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="truncate text-sm font-semibold leading-tight">
                      {member.name}
                    </p>
                    <p className="truncate font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trailer */}
        {trailer && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="h-0.5 w-12 bg-accent" aria-hidden="true" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t('movieDetail.sections.trailer')}
              </h2>
            </div>

            <div className="aspect-video overflow-hidden border border-border">
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

        {/* Movie Info */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="h-0.5 w-12 bg-accent" aria-hidden="true" />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('movieDetail.sections.info')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 font-mono text-sm md:grid-cols-4">
            <div className="space-y-2">
              <p className="uppercase tracking-wide text-muted-foreground">
                {t('movieDetail.info.originalTitle')}
              </p>
              <p className="font-semibold">{detail.original_title}</p>
            </div>
            <div className="space-y-2">
              <p className="uppercase tracking-wide text-muted-foreground">
                {t('movieDetail.info.status')}
              </p>
              <p className="font-semibold">{detail.status}</p>
            </div>
            {detail.budget > 0 && (
              <div className="space-y-2">
                <p className="uppercase tracking-wide text-muted-foreground">
                  {t('movieDetail.info.budget')}
                </p>
                <p className="font-semibold">
                  ${detail.budget.toLocaleString()}
                </p>
              </div>
            )}
            {detail.revenue > 0 && (
              <div className="space-y-2">
                <p className="uppercase tracking-wide text-muted-foreground">
                  {t('movieDetail.info.revenue')}
                </p>
                <p className="font-semibold">
                  ${detail.revenue.toLocaleString()}
                </p>
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
    <div className="container mx-auto space-y-12 px-6 py-12 md:px-12 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row">
        <Skeleton className="h-96 w-full shrink-0 md:w-64 lg:w-80" />
        <div className="flex-1 space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
