import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { WishlistButton } from '@/components/features/wishlist/WishlistButton'
import { getPosterUrl, formatRating, formatYear } from '@/utils/helpers'
import { ROUTES } from '@/utils/constants'
import type { Movie } from '@/services/tmdb/types'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link to={ROUTES.MOVIE_DETAIL(movie.id)} className="block">
        {/* 海報 */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover 遮罩 */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-3 text-xs text-white/90">
              {movie.overview || '暫無簡介'}
            </p>
          </div>

          {/* 評分 Badge */}
          <Badge className="absolute top-2 left-2 gap-1" variant="secondary">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            {formatRating(movie.vote_average)}
          </Badge>
        </div>

        {/* 資訊 */}
        <div className="mt-2 space-y-1">
          <h3 className="truncate text-sm font-medium">{movie.title}</h3>
          <p className="text-muted-foreground text-xs">
            {formatYear(movie.release_date)}
          </p>
        </div>
      </Link>

      {/* 收藏按鈕 */}
      <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <WishlistButton movie={movie} />
      </div>
    </motion.div>
  )
}
