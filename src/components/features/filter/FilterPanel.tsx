import { useQuery } from '@tanstack/react-query'
import { RotateCcw } from 'lucide-react'
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

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'popularity.desc', label: '熱門度 (高→低)' },
  { value: 'popularity.asc', label: '熱門度 (低→高)' },
  { value: 'vote_average.desc', label: '評分 (高→低)' },
  { value: 'vote_average.asc', label: '評分 (低→高)' },
  { value: 'primary_release_date.desc', label: '上映日期 (新→舊)' },
  { value: 'primary_release_date.asc', label: '上映日期 (舊→新)' },
]

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

  return (
    <div className="space-y-6">
      {/* 排序 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">排序方式</h4>
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
        <h4 className="text-sm font-medium">類型</h4>
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
        <h4 className="text-sm font-medium">年份</h4>
        <div className="flex items-center gap-2">
          <Select
            value={year.from?.toString() ?? ''}
            onValueChange={(v) =>
              setYear({ ...year, from: v ? Number(v) : null })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="從" />
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
              <SelectValue placeholder="到" />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 最低評分 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">最低評分</h4>
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
                {r} 分以上
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 重置 */}
      {hasActiveFilters() && (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          <RotateCcw className="size-4" />
          重置篩選
        </Button>
      )}
    </div>
  )
}
