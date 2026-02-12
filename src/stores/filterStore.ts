import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  FilterState,
  RatingRange,
  SortBy,
  YearRange,
} from '@/types/filter'

const DEFAULT_FILTER: FilterState = {
  genres: [],
  year: { from: null, to: null },
  rating: { min: 0, max: 10 },
  sortBy: 'popularity.desc',
}

interface FilterActions {
  setGenres: (genres: number[]) => void
  toggleGenre: (genreId: number) => void
  setYear: (year: YearRange) => void
  setRating: (rating: RatingRange) => void
  setSortBy: (sortBy: SortBy) => void
  resetFilters: () => void
  hasActiveFilters: () => boolean
}

type FilterStore = FilterState & FilterActions

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set, get) => ({
      // State
      ...DEFAULT_FILTER,

      // Actions
      setGenres: (genres) => {
        set({ genres }, false, 'setGenres')
      },

      toggleGenre: (genreId) => {
        const { genres } = get()
        const next = genres.includes(genreId)
          ? genres.filter((id) => id !== genreId)
          : [...genres, genreId]
        set({ genres: next }, false, 'toggleGenre')
      },

      setYear: (year) => {
        set({ year }, false, 'setYear')
      },

      setRating: (rating) => {
        set({ rating }, false, 'setRating')
      },

      setSortBy: (sortBy) => {
        set({ sortBy }, false, 'setSortBy')
      },

      resetFilters: () => {
        set(DEFAULT_FILTER, false, 'resetFilters')
      },

      hasActiveFilters: () => {
        const { genres, year, rating, sortBy } = get()
        return (
          genres.length > 0 ||
          year.from !== null ||
          year.to !== null ||
          rating.min !== 0 ||
          rating.max !== 10 ||
          sortBy !== 'popularity.desc'
        )
      },
    }),
    { name: 'filter-store' },
  ),
)
