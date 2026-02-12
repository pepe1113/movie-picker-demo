import { X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { getGenres } from '@/services/tmdb/api'
import { useFilterStore } from '@/stores/filterStore'
import { QUERY_KEYS } from '@/utils/constants'

export function FilterChips() {
  const {
    genres: selectedGenres,
    year,
    rating,
    toggleGenre,
    setYear,
    setRating,
    hasActiveFilters,
  } = useFilterStore()

  const { data: allGenres = [] } = useQuery({
    queryKey: QUERY_KEYS.genres,
    queryFn: getGenres,
  })

  if (!hasActiveFilters()) return null

  const genreNames = selectedGenres
    .map((id) => allGenres.find((g) => g.id === id))
    .filter(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-sm">篩選條件：</span>

      {genreNames.map((genre) => (
        <Badge
          key={genre!.id}
          variant="secondary"
          className="cursor-pointer gap-1"
          onClick={() => toggleGenre(genre!.id)}
        >
          {genre!.name}
          <X className="size-3" />
        </Badge>
      ))}

      {year.from && (
        <Badge
          variant="secondary"
          className="cursor-pointer gap-1"
          onClick={() => setYear({ ...year, from: null })}
        >
          從 {year.from} 年
          <X className="size-3" />
        </Badge>
      )}

      {year.to && (
        <Badge
          variant="secondary"
          className="cursor-pointer gap-1"
          onClick={() => setYear({ ...year, to: null })}
        >
          到 {year.to} 年
          <X className="size-3" />
        </Badge>
      )}

      {rating.min > 0 && (
        <Badge
          variant="secondary"
          className="cursor-pointer gap-1"
          onClick={() => setRating({ ...rating, min: 0 })}
        >
          {rating.min} 分以上
          <X className="size-3" />
        </Badge>
      )}
    </div>
  )
}
