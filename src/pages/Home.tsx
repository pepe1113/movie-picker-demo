import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { MovieSection } from '@/components/features/movie/MovieSection'
import { useMovies } from '@/hooks/useMovies'
import { getBackdropUrl } from '@/utils/helpers'

export function Component() {
  const { t } = useTranslation()
  const trending = useMovies('trending')
  const popular = useMovies('popular')
  const topRated = useMovies('top_rated')

  // Select one of the top 5 trending movies for hero background
  // Use day of year as seed for consistent daily selection
  const heroBackdrop = useMemo(() => {
    const movies = trending.data?.movies ?? []
    if (movies.length === 0) return null

    const top5 = movies.slice(0, 5)
    // Use current day of year as index for stable daily rotation
    const now = new Date()
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24,
    )
    const selectedMovie = top5[dayOfYear % top5.length]

    return selectedMovie?.backdrop_path
      ? getBackdropUrl(selectedMovie.backdrop_path)
      : null
  }, [trending.data?.movies])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Bold Typography Style */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Hero Background Image */}
        {heroBackdrop && (
          <div className="absolute inset-0">
            <img
              src={heroBackdrop}
              alt=""
              className="size-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        {/* Decorative background number */}
        <div
          className="pointer-events-none absolute -right-20 top-0 select-none text-[20rem] font-bold leading-none tracking-tighter text-border opacity-30 md:text-[28rem] lg:-right-10 lg:text-[32rem]"
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
              {t('home.hero.title')}
            </h1>

            {/* Subtitle - Generous spacing */}
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t('home.hero.subtitle')}
            </p>

            {/* CTA Buttons - Underline style */}
            <div className="flex flex-wrap gap-6 pt-4">
              <Button size="lg" asChild>
                <Link to="/random">
                  {t('home.hero.ctaRandom')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link to="/top100">{t('home.hero.ctaTop100')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto space-y-28 px-6 py-28 md:space-y-40 md:px-12 md:py-40 lg:px-16">
        {/* Trending Section */}
        <MovieSection
          title={t('home.sections.trending')}
          movies={trending.data?.movies ?? []}
          isLoading={trending.isLoading}
          limit={12}
          sectionNumber="02"
        />

        {/* Popular Section */}
        <MovieSection
          title={t('home.sections.popular')}
          movies={popular.data?.movies ?? []}
          isLoading={popular.isLoading}
          limit={12}
          sectionNumber="03"
        />

        {/* Top Rated Section */}
        <MovieSection
          title={t('home.sections.topRated')}
          movies={topRated.data?.movies ?? []}
          isLoading={topRated.isLoading}
          limit={12}
          moreLink="/top100"
          moreLinkText={t('home.sections.viewAll')}
          sectionNumber="04"
        />
      </div>
    </div>
  )
}
