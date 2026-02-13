export type SortBy =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'

export interface YearRange {
  from: number | null
  to: number | null
}

export interface RatingRange {
  min: number
  max: number
}

export interface FilterState {
  genres: number[]
  year: YearRange
  rating: RatingRange
  sortBy: SortBy
}
