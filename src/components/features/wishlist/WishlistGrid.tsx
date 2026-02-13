import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { MovieGrid } from '@/components/features/movie/MovieGrid'
import { useWishlistStore } from '@/stores/wishlistStore'

export function WishlistGrid() {
  const { t } = useTranslation()
  const { wishlist } = useWishlistStore()

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Heart className="text-muted-foreground size-16 stroke-1" />
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            {t('wishlist.empty.title')}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {t('wishlist.empty.description')}
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/">{t('wishlist.empty.explore')}</a>
        </Button>
      </div>
    )
  }

  return <MovieGrid movies={wishlist} />
}
