import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Dice5, Star, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { WishlistButton } from '@/components/features/wishlist/WishlistButton'
import { useMovies } from '@/hooks/useMovies'
import { getPosterUrl, formatRating, formatYear } from '@/utils/helpers'
import { ROUTES } from '@/utils/constants'
import type { Movie } from '@/services/tmdb/types'

function pickRandom(movies: Movie[], count: number): Movie[] {
  const shuffled = [...movies].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function Component() {
  const { data, isLoading } = useMovies('popular')
  const allMovies = useMemo(() => data?.movies ?? [], [data?.movies])

  const [picks, setPicks] = useState<Movie[]>([])
  const [hasRolled, setHasRolled] = useState(false)

  const roll = useCallback(() => {
    if (allMovies.length === 0) return
    setPicks(pickRandom(allMovies, 3))
    setHasRolled(true)
  }, [allMovies])

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">隨機挑片</h1>
        <p className="text-muted-foreground mt-2">
          選擇障礙救星！讓我們幫你挑三部電影
        </p>
      </div>

      {/* 骰子按鈕 */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={roll}
          disabled={isLoading || allMovies.length === 0}
          className="gap-2 text-lg"
        >
          {hasRolled ? (
            <>
              <RefreshCw className="size-5" />
              再選一次
            </>
          ) : (
            <>
              <Dice5 className="size-5" />
              開始挑片
            </>
          )}
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* 結果 */}
      <AnimatePresence mode="wait">
        {picks.length > 0 && (
          <motion.div
            key={picks.map((p) => p.id).join('-')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {picks.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-xl border shadow-lg"
              >
                <Link to={ROUTES.MOVIE_DETAIL(movie.id)}>
                  <img
                    src={getPosterUrl(movie.poster_path, 'large')}
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
                    <h3 className="text-lg font-bold text-white">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      {formatRating(movie.vote_average)}
                      <span>·</span>
                      <span>{formatYear(movie.release_date)}</span>
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70">
                      {movie.overview}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-3 right-3">
                  <WishlistButton movie={movie} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 未選擇提示 */}
      {!hasRolled && !isLoading && (
        <div className="text-muted-foreground py-12 text-center">
          <Dice5 className="mx-auto mb-4 size-16 stroke-1" />
          <p>按下按鈕，讓命運幫你決定今晚看什麼！</p>
        </div>
      )}
    </div>
  )
}
