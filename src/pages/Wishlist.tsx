import { WishlistGrid } from '@/components/features/wishlist/WishlistGrid'
import { useWishlistStore } from '@/stores/wishlistStore'

export function Component() {
  const { wishlist } = useWishlistStore()

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">收藏清單</h1>
        {wishlist.length > 0 && (
          <p className="text-muted-foreground mt-1">
            共 {wishlist.length} 部電影
          </p>
        )}
      </div>
      <WishlistGrid />
    </div>
  )
}
