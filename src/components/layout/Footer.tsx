import { Film } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex items-center gap-2">
          <Film className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-sm">
            本產品使用{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-4"
            >
              TMDB API
            </a>
            ，但未經 TMDB 認可或認證。
          </p>
        </div>
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Movie Picker
        </p>
      </div>
    </footer>
  )
}
