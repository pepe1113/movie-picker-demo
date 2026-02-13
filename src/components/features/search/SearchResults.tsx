import { useTranslation } from 'react-i18next'
import { MovieGrid } from '@/components/features/movie/MovieGrid'
import { useSearch } from '@/hooks/useSearch'

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const { t } = useTranslation()
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    debouncedQuery,
  } = useSearch(query)

  if (!debouncedQuery) return null

  return (
    <div className="space-y-4">
      {data && (
        <p className="text-muted-foreground text-sm">
          {t('searchResults.found', { count: data.totalResults })}
        </p>
      )}
      <MovieGrid
        movies={data?.movies ?? []}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        emptyMessage={t('searchResults.notFound', { query: debouncedQuery })}
      />
    </div>
  )
}
