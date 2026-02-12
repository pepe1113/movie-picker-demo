import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieGrid } from '@/components/features/movie/MovieGrid'
import { useWishlistStore } from '@/stores/wishlistStore'

export function WishlistGrid() {
  const { wishlist } = useWishlistStore()

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Heart className="text-muted-foreground size-16 stroke-1" />
        <div className="text-center">
          <p className="text-muted-foreground text-lg">收藏清單是空的</p>
          <p className="text-muted-foreground mt-1 text-sm">
            開始探索電影，將喜歡的電影加入收藏吧！
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/">探索電影</a>
        </Button>
      </div>
    )
  }

  return <MovieGrid movies={wishlist} />
}
