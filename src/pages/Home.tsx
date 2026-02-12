import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieSection } from '@/components/features/movie/MovieSection'
import { useMovies } from '@/hooks/useMovies'

export function Component() {
  const trending = useMovies('trending')
  const popular = useMovies('popular')
  const topRated = useMovies('top_rated')

  return (
    <div className="min-h-screen">
      {/* Hero Section - Bold Typography Style */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Decorative background number */}
        <div
          className="pointer-events-none absolute -right-20 top-0 select-none text-[20rem] font-bold leading-none tracking-tighter text-border opacity-50 md:text-[28rem] lg:-right-10 lg:text-[32rem]"
          aria-hidden="true"
        >
          01
        </div>

        <div className="container relative mx-auto px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl space-y-8"
          >
            {/* Accent bar */}
            <div className="h-1 w-16 bg-accent" aria-hidden="true" />

            {/* Main headline - Extreme scale */}
            <h1 className="text-5xl font-bold leading-none tracking-tighter text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
              發現你的
              <br />
              下一部
              <br />
              <span className="text-accent">經典電影</span>
            </h1>

            {/* Subtitle - Generous spacing */}
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              從熱門大片到經典佳作，讓我們幫你找到完美的觀影選擇。
              智能推薦系統與隨機挑片功能，解決你的選擇困難。
            </p>

            {/* CTA Buttons - Underline style */}
            <div className="flex flex-wrap gap-6 pt-4">
              <Button size="lg" asChild>
                <Link to="/random">
                  開始隨機挑片
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link to="/top100">瀏覽 TOP 100</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto space-y-28 px-6 py-28 md:space-y-40 md:px-12 md:py-40 lg:px-16">
        {/* Trending Section */}
        <MovieSection
          title="本週趨勢"
          movies={trending.data?.movies ?? []}
          isLoading={trending.isLoading}
          limit={12}
          sectionNumber="02"
        />

        {/* Popular Section */}
        <MovieSection
          title="熱門電影"
          movies={popular.data?.movies ?? []}
          isLoading={popular.isLoading}
          limit={12}
          sectionNumber="03"
        />

        {/* Top Rated Section */}
        <MovieSection
          title="高評分電影"
          movies={topRated.data?.movies ?? []}
          isLoading={topRated.isLoading}
          limit={12}
          moreLink="/top100"
          moreLinkText="查看完整 TOP 100"
          sectionNumber="04"
        />
      </div>
    </div>
  )
}
