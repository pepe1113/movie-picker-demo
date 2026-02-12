import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
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
}

export function MovieSection({
  title,
  subtitle,
  movies,
  isLoading = false,
  limit,
  moreLink,
  moreLinkText = '查看更多',
}: MovieSectionProps) {
  const displayMovies = limit ? movies.slice(0, limit) : movies

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
          )}
        </div>
        {moreLink && (
          <Button variant="ghost" size="sm" asChild>
            <Link to={moreLink}>
              {moreLinkText}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: limit ?? 12 }).map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {displayMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
