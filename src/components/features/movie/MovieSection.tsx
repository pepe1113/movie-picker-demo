import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieCard } from './MovieCard'
import { MovieSkeleton } from './MovieSkeleton'
import type { Movie } from '@/services/tmdb/types'

interface MovieSectionProps {
  title: string
  subtitle?: string
  movies: Movie[]
  isLoading?: boolean
  limit?: number
  moreLink?: string
  moreLinkText?: string
  sectionNumber?: string
}

export function MovieSection({
  title,
  subtitle,
  movies,
  isLoading = false,
  limit,
  moreLink,
  moreLinkText = '查看更多',
  sectionNumber,
}: MovieSectionProps) {
  const displayMovies = limit ? movies.slice(0, limit) : movies

  return (
    <section className="relative">
      {/* Decorative section number */}
      {sectionNumber && (
        <div
          className="pointer-events-none absolute -left-4 -top-8 select-none text-[8rem] font-bold leading-none tracking-tighter text-border opacity-30 md:-left-8 md:text-[12rem] lg:text-[14rem]"
          aria-hidden="true"
        >
          {sectionNumber}
        </div>
      )}

      <div className="relative space-y-8">
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            {/* Accent bar */}
            <div className="h-0.5 w-12 bg-accent" aria-hidden="true" />

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h2>

            {subtitle && (
              <p className="text-base text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {moreLink && (
            <Button variant="ghost" asChild className="hidden md:inline-flex">
              <Link to={moreLink}>
                {moreLinkText}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Movie Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: limit ?? 12 }).map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Mobile "More" link */}
        {moreLink && (
          <div className="md:hidden">
            <Button variant="ghost" asChild className="w-full">
              <Link to={moreLink}>
                {moreLinkText}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
