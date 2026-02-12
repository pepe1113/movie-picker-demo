import { MovieGrid } from '@/components/features/movie/MovieGrid'
import { useSearch } from '@/hooks/useSearch'

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
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
          找到 {data.totalResults} 部相關電影
        </p>
      )}
      <MovieGrid
        movies={data?.movies ?? []}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        emptyMessage={`找不到「${debouncedQuery}」的相關電影`}
      />
    </div>
  )
}
