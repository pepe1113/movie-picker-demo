import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { WishlistButton } from '@/components/features/wishlist/WishlistButton'
import { getPosterUrl, formatRating, formatYear } from '@/utils/helpers'
import { ROUTES } from '@/utils/constants'
import type { Movie } from '@/services/tmdb/types'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={ROUTES.MOVIE_DETAIL(movie.id)} className="block">
        {/* Poster - No rounded corners */}
        <div className="relative aspect-[2/3] overflow-hidden border border-border bg-muted transition-colors hover:border-accent">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay - Simplified */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-3 text-xs leading-relaxed text-foreground/90">
              {movie.overview || t('movieCard.noOverview')}
            </p>
          </div>

          {/* Rating Badge - Sharp edges */}
          <Badge
            className="absolute top-3 left-3 gap-1 font-mono"
            variant="secondary"
          >
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            {formatRating(movie.vote_average)}
          </Badge>
        </div>

        {/* Info - Increased spacing */}
        <div className="mt-3 space-y-1">
          <h3 className="truncate font-semibold leading-tight tracking-tight">
            {movie.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {formatYear(movie.release_date)}
          </p>
        </div>
      </Link>

      {/* Wishlist Button - Always visible on mobile, hover on desktop */}
      <div className="absolute top-3 right-3 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <WishlistButton movie={movie} />
      </div>
    </motion.div>
  )
}
