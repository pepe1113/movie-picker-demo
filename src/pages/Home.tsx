import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dice5, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieSection } from '@/components/features/movie/MovieSection'
import { useMovies } from '@/hooks/useMovies'
import { getBackdropUrl } from '@/utils/helpers'

export function Component() {
  const trending = useMovies('trending')
  const popular = useMovies('popular')
  const topRated = useMovies('top_rated')

  const heroMovie = trending.data?.movies[0]

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getBackdropUrl(heroMovie.backdrop_path)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
          <div className="relative container mx-auto flex h-full items-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg space-y-4"
            >
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                {heroMovie.title}
              </h1>
              <p className="line-clamp-3 text-white/80">{heroMovie.overview}</p>
              <div className="flex gap-3">
                <Button size="lg" asChild>
                  <Link to={`/movie/${heroMovie.id}`}>
                    <TrendingUp className="size-4" />
                    查看詳情
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/random" className="text-white">
                    <Dice5 className="size-4" />
                    隨機挑片
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 內容區塊 */}
      <div className="container mx-auto space-y-12 px-4">
        {/* 本週趨勢 */}
        <MovieSection
          title="本週趨勢"
          subtitle="大家都在看什麼"
          movies={trending.data?.movies ?? []}
          isLoading={trending.isLoading}
          limit={12}
        />

        {/* 熱門電影 */}
        <MovieSection
          title="熱門電影"
          subtitle="現在最受歡迎的電影"
          movies={popular.data?.movies ?? []}
          isLoading={popular.isLoading}
          limit={12}
        />

        {/* 高評分電影 */}
        <MovieSection
          title="高評分電影"
          subtitle="影迷票選最佳電影"
          movies={topRated.data?.movies ?? []}
          isLoading={topRated.isLoading}
          limit={12}
          moreLink="/top100"
          moreLinkText="查看 Top 100"
        />
      </div>
    </div>
  )
}
