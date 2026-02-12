import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '@/components/features/search/SearchBar'
import { SearchResults } from '@/components/features/search/SearchResults'

export function Component() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold">搜尋電影</h1>
      <SearchBar defaultValue={query} autoFocus />
      <SearchResults query={query} />
    </div>
  )
}
