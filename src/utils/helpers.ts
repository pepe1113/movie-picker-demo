import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from './constants'

export function getPosterUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.poster = 'medium',
): string {
  if (!path) return '/placeholder-poster.svg'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster[size]}${path}`
}

export function getBackdropUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.backdrop = 'large',
): string {
  if (!path) return ''
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop[size]}${path}`
}

export function getProfileUrl(path: string | null): string {
  if (!path) return '/placeholder-avatar.svg'
  return `${TMDB_IMAGE_BASE_URL}/w185${path}`
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatYear(dateString: string): string {
  if (!dateString) return ''
  return dateString.slice(0, 4)
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins} 分鐘`
  return `${hours} 小時 ${mins} 分鐘`
}
