import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { Movie } from '@/services/tmdb/types'

interface WishlistButtonProps {
  movie: Movie
  size?: 'default' | 'lg'
}

export function WishlistButton({
  movie,
  size = 'default',
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(movie.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      removeFromWishlist(movie.id)
      toast.success(`已從收藏移除「${movie.title}」`)
    } else {
      addToWishlist(movie)
      toast.success(`已加入收藏「${movie.title}」`)
    }
  }

  return (
    <motion.div whileTap={{ scale: 0.85 }}>
      <Button
        variant={isWishlisted ? 'default' : 'secondary'}
        size={size === 'lg' ? 'default' : 'icon-sm'}
        onClick={handleClick}
        className={size === 'lg' ? 'gap-2' : ''}
      >
        <Heart className={`size-4 ${isWishlisted ? 'fill-current' : ''}`} />
        {size === 'lg' && (isWishlisted ? '已收藏' : '加入收藏')}
      </Button>
    </motion.div>
  )
}
