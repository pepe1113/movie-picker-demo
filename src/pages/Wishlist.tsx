import { Star, Clock, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { WishlistGrid } from '@/components/features/wishlist/WishlistGrid'
import { useWishlistStore } from '@/stores/wishlistStore'
import { formatRating } from '@/utils/helpers'

export function Component() {
  const { wishlist, clearWishlist } = useWishlistStore()

  const avgRating =
    wishlist.length > 0
      ? wishlist.reduce((sum, m) => sum + m.vote_average, 0) / wishlist.length
      : 0

  const handleClear = () => {
    clearWishlist()
    toast.success('已清空收藏清單')
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">收藏清單</h1>
          {wishlist.length > 0 && (
            <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="size-4" />共 {wishlist.length} 部電影
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-4" />
                平均評分 {formatRating(avgRating)}
              </span>
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="size-4" />
                清空收藏
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>確定要清空收藏清單？</DialogTitle>
                <DialogDescription>
                  這會移除所有 {wishlist.length} 部收藏的電影，此操作無法復原。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">取消</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleClear}>
                    確定清空
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <WishlistGrid />
    </div>
  )
}
