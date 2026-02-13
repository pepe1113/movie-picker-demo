import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Movie } from '@/services/tmdb/types'

interface WishlistState {
  wishlist: Movie[]
  isLoading: boolean
}

interface WishlistActions {
  addToWishlist: (movie: Movie) => void
  removeFromWishlist: (movieId: number) => void
  clearWishlist: () => void
  isInWishlist: (movieId: number) => boolean
}

type WishlistStore = WishlistState & WishlistActions

export const useWishlistStore = create<WishlistStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        wishlist: [],
        isLoading: false,

        // Actions
        addToWishlist: (movie) => {
          const { wishlist } = get()
          if (wishlist.some((m) => m.id === movie.id)) return
          set({ wishlist: [...wishlist, movie] }, false, 'addToWishlist')
        },

        removeFromWishlist: (movieId) => {
          set(
            (state) => ({
              wishlist: state.wishlist.filter((m) => m.id !== movieId),
            }),
            false,
            'removeFromWishlist',
          )
        },

        clearWishlist: () => {
          set({ wishlist: [] }, false, 'clearWishlist')
        },

        isInWishlist: (movieId) => {
          return get().wishlist.some((m) => m.id === movieId)
        },
      }),
      { name: 'wishlist-storage' },
    ),
    { name: 'wishlist-store' },
  ),
)
