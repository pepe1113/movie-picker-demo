import { useQuery } from '@tanstack/react-query'
import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getGenres } from '@/services/tmdb/api'
import { useFilterStore } from '@/stores/filterStore'
import { QUERY_KEYS } from '@/utils/constants'
import type { SortBy } from '@/types/filter'

const YEAR_OPTIONS = (() => {
  const currentYear = new Date().getFullYear()
  const years: number[] = []
  for (let y = currentYear; y >= 1950; y--) {
    years.push(y)
  }
  return years
})()

const RATING_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function FilterPanel() {
  const { t } = useTranslation()
  const {
    genres: selectedGenres,
    year,
    rating,
    sortBy,
    toggleGenre,
    setYear,
    setRating,
    setSortBy,
    resetFilters,
    hasActiveFilters,
  } = useFilterStore()

  const { data: genres = [] } = useQuery({
    queryKey: QUERY_KEYS.genres,
    queryFn: getGenres,
  })

  const SORT_OPTIONS: { value: SortBy; label: string }[] = [
    { value: 'popularity.desc', label: t('filter.sortOptions.popularityDesc') },
    { value: 'popularity.asc', label: t('filter.sortOptions.popularityAsc') },
    { value: 'vote_average.desc', label: t('filter.sortOptions.ratingDesc') },
    { value: 'vote_average.asc', label: t('filter.sortOptions.ratingAsc') },
    {
      value: 'primary_release_date.desc',
      label: t('filter.sortOptions.releaseDateDesc'),
    },
    {
      value: 'primary_release_date.asc',
      label: t('filter.sortOptions.releaseDateAsc'),
    },
  ]

  return (
    <div className="space-y-6">
      {/* 排序 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('filter.sortBy')}</h4>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 類型 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('filter.genres')}</h4>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre.id}
              variant={
                selectedGenres.includes(genre.id) ? 'default' : 'outline'
              }
              className="cursor-pointer"
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* 年份 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('filter.year')}</h4>
        <div className="flex items-center gap-2">
          <Select
            value={year.from?.toString() ?? ''}
            onValueChange={(v) => {
              const newFrom = v ? Number(v) : null
              // If new from year is greater than current to year, reset to year
              const newTo =
                newFrom && year.to && newFrom > year.to ? null : year.to
              setYear({ from: newFrom, to: newTo })
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('filter.yearFrom')} />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">—</span>
          <Select
            value={year.to?.toString() ?? ''}
            onValueChange={(v) =>
              setYear({ ...year, to: v ? Number(v) : null })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('filter.yearTo')} />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.filter((y) => !year.from || y >= year.from).map(
                (y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 最低評分 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('filter.minRating')}</h4>
        <Select
          value={rating.min.toString()}
          onValueChange={(v) => setRating({ ...rating, min: Number(v) })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RATING_OPTIONS.map((r) => (
              <SelectItem key={r} value={r.toString()}>
                {t('filter.ratingAbove', { rating: r })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 重置 */}
      {hasActiveFilters() && (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          <RotateCcw className="size-4" />
          {t('filter.resetFilters')}
        </Button>
      )}
    </div>
  )
}
